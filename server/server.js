const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save to Supabase
        const { data, error } = await supabase
            .from('users')
            .insert([
                { full_name: fullName, email, password_hash: hashedPassword }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Sign JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.full_name },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json(req.user);
});

// --- Chat Routes ---

app.post('/api/chat/message', authenticateToken, async (req, res) => {
    try {
        const { message, sessionId, seedHistory, mode, topic } = req.body;
        const userId = req.user.id;

        // 1. Get or Create Session
        let currentSessionId = sessionId;
        if (!currentSessionId) {
            const { data: newSession, error: sError } = await supabase
                .from('chat_sessions')
                .insert([{ user_id: userId }])
                .select()
                .single();
            if (sError) throw sError;
            currentSessionId = newSession.id;

            // Seed initial history if provided
            if (seedHistory && Array.isArray(seedHistory)) {
                const seedMessages = seedHistory.map(msg => ({
                    session_id: currentSessionId,
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content
                }));
                const { error: seedError } = await supabase.from('messages').insert(seedMessages);
                if (seedError) console.error("Failed to seed initial history:", seedError);
            }
        }

        // 2. Fetch History for Context
        const { data: history } = await supabase
            .from('messages')
            .select('role, content')
            .eq('session_id', currentSessionId)
            .order('created_at', { ascending: true });

        console.log("SESSION ID:", currentSessionId);
        console.log("FETCHED HISTORY:", JSON.stringify(history, null, 2));

        // Count user messages
        const userMsgCount = history ? history.filter(m => m.role === 'user').length : 0;

        // 3. Prepare AI Request based on Mode & Topic
        const activeTopic = topic || 'Topik yang sedang dipilih';
        const activeMode = mode || 'socratic';
        
        let systemPrompt = `Kamu adalah Socratic AI tutor bernama PahamIn. Saat ini kamu mendampingi siswa untuk mempelajari topik "${activeTopic}".
        
        ATURAN UTAMA:
        1. JANGAN PERNAH memberikan jawaban langsung atas pertanyaan materi atau konsep "${activeTopic}". Kamu HARUS memandu siswa menggunakan metode Tanya-Jawab Sokrates (Socratic) dengan memberikan pertanyaan pemantik secara bertahap agar siswa dapat menemukan jawaban secara mandiri.
        2. SELALU gunakan bahasa Indonesia yang ramah, sopan, dan santun. JANGAN PERNAH menjawab dalam bahasa Inggris atau menyisipkan template instruksi bahasa Inggris ke dalam respon.
        
        PENGECUALIAN ATURAN (PENTING):
        Jika siswa bertanya khusus tentang bagaimana MEKANISME diskusi ini berlangsung atau SAMPAI KAPAN diskusi ini akan berjalan, kamu WAJIB (dan diperbolehkan) memberikan penjelasan langsung secara ramah dalam bahasa Indonesia:
        - Jelaskan bahwa mekanismenya menggunakan metode Sokrates (tanya-jawab terbimbing secara bertahap).
        - Jelaskan bahwa diskusi akan berlangsung secara interaktif sampai siswa memahami topik tersebut dan dapat merumuskan kesimpulan mandiri (biasanya setelah 4 pertukaran pesan, siswa akan diminta menyimpulkan pemahamannya sendiri).`;

        if (activeMode === 'guided') {
            systemPrompt = `Kamu adalah AI tutor PahamIn dalam mode Guided Practice untuk mempelajari topik "${activeTopic}".
            
            ATURAN UTAMA:
            1. Tugasmu adalah membantu siswa memahami konsep secara terpandu dan bertahap. Jelaskan konsep dasar dengan bahasa yang mudah dipahami, lalu berikan contoh sederhana, dan ajak siswa mengerjakan latihan terbimbing langkah demi langkah. Berikan bantuan/clues jika siswa mengalami kesulitan, dan puji kemajuan mereka.
            2. SELALU gunakan bahasa Indonesia yang ramah, sopan, dan santun. JANGAN PERNAH menjawab dalam bahasa Inggris atau menyisipkan template instruksi bahasa Inggris ke dalam respon.
            
            PENGECUALIAN ATURAN (PENTING):
            Jika siswa bertanya khusus tentang bagaimana MEKANISME diskusi ini berlangsung atau SAMPAI KAPAN diskusi ini akan berjalan, kamu WAJIB memberikan penjelasan langsung secara ramah dalam bahasa Indonesia:
            - Jelaskan bahwa mekanismenya adalah bimbingan terpandu (Guided Practice), di mana AI menjelaskan konsep dasar secara bertahap, memberikan contoh, dan memandu pengerjaan latihan langkah demi langkah.
            - Jelaskan bahwa diskusi akan berlangsung sampai siswa menguasai konsep/sub-topik tersebut atau sampai siswa merasa cukup dan ingin beralih ke sub-topik lain.`;
        } else if (activeMode === 'latihan') {
            systemPrompt = `Kamu adalah AI tutor PahamIn dalam mode Latihan Soal untuk topik "${activeTopic}".
            
            ATURAN UTAMA:
            1. Tugasmu adalah membuatkan latihan soal interaktif untuk menguji pemahaman siswa tentang topik yang dibahas. Berikan soal satu per satu (jangan langsung memberikan banyak soal sekaligus). Tunggu siswa menjawab, evaluasi jawabannya dengan detail (jelaskan letak kesalahan jika ada), lalu berikan soal latihan berikutnya.
            2. SELALU gunakan bahasa Indonesia yang ramah, sopan, dan santun. JANGAN PERNAH menjawab dalam bahasa Inggris atau menyisipkan template instruksi bahasa Inggris ke dalam respon.
            
            PENGECUALIAN ATURAN (PENTING):
            Jika siswa bertanya khusus tentang bagaimana MEKANISME diskusi ini berlangsung atau SAMPAI KAPAN diskusi ini akan berjalan, kamu WAJIB memberikan penjelasan langsung secara ramah dalam bahasa Indonesia:
            - Jelaskan bahwa mekanismenya adalah pengerjaan Latihan Soal interaktif secara bertahap, di mana AI memberikan soal satu per satu, mengevaluasi jawaban siswa, dan memberikan pembahasan jika ada kesalahan.
            - Diskusi berlangsung sampai semua latihan soal diselesaikan dengan baik atau sampai siswa memutuskan untuk berhenti berlatih.`;
        }

        // Gemini API requires chat history to start with a 'user' message and strictly alternate.
        // We build a robust geminiHistory representation.
        const geminiHistory = [];
        let expectedRole = 'user';
        
        for (const msg of history) {
            const currentRole = msg.role === 'user' ? 'user' : 'model';
            
            // Skip leading assistant messages until we hit the first user message
            if (geminiHistory.length === 0 && currentRole !== 'user') {
                continue;
            }
            
            if (currentRole === expectedRole) {
                geminiHistory.push({
                    role: currentRole,
                    parts: [{ text: msg.content }]
                });
                expectedRole = expectedRole === 'user' ? 'model' : 'user';
            } else if (geminiHistory.length > 0) {
                // If we get consecutive messages of the same role, append the text to avoid role mismatch errors
                const lastMsg = geminiHistory[geminiHistory.length - 1];
                lastMsg.parts[0].text += "\n" + msg.content;
            }
        }
        
        // Ensure the history ends with 'model' so that chat.sendMessage can append a user message safely
        while (geminiHistory.length > 0 && geminiHistory[geminiHistory.length - 1].role !== 'model') {
            geminiHistory.pop();
        }

        // Set systemInstruction at the model instantiation level to ensure Socratic tutor constraints are enforced correctly
        const socraticModel = genAI.getGenerativeModel({ 
            model: "gemini-3.5-flash",
            systemInstruction: systemPrompt
        });

        let chat = socraticModel.startChat({
            history: geminiHistory,
            generationConfig: { maxOutputTokens: 500 }
        });

        const result = await chat.sendMessage(message);
        
        let aiResponse = result.response.text();

        // 4. Logic: Every 4 user messages, inject conclusion prompt (only for Socratic mode)
        if (activeMode === 'socratic' && userMsgCount + 1 >= 4) {
            aiResponse += "\n\nBerdasarkan diskusi kita, coba simpulkan pemahamanmu sendiri ya!";
        }

        // 5. Save to DB
        await supabase.from('messages').insert([
            { session_id: currentSessionId, role: 'user', content: message },
            { session_id: currentSessionId, role: 'assistant', content: aiResponse }
        ]);

        res.json({
            response: aiResponse,
            sessionId: currentSessionId,
            messageCount: userMsgCount + 1
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chat failed', error: error.message });
    }
});

app.get('/api/chat/history/:sessionId', authenticateToken, async (req, res) => {
    try {
        const { data: history, error } = await supabase
            .from('messages')
            .select('*')
            .eq('session_id', req.params.sessionId)
            .order('created_at', { ascending: true });

        if (error) throw error;
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'History failed' });
    }
});

app.post('/api/chat/reset', authenticateToken, async (req, res) => {
    try {
        const { data: newSession, error } = await supabase
            .from('chat_sessions')
            .insert([{ user_id: req.user.id }])
            .select()
            .single();

        if (error) throw error;
        res.json({ sessionId: newSession.id });
    } catch (error) {
        res.status(500).json({ message: 'Reset failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
