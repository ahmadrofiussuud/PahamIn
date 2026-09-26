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

// --- Socratic Dummy Response Generator (Fallback when Gemini API quota is exhausted) ---
const generateSocraticDummyResponse = (message, mode = 'socratic', topic = 'Trigonometri', userMsgCount = 1) => {
    const msgLower = (message || '').toLowerCase();
    const activeTopic = topic || 'Trigonometri';

    if (msgLower.includes('ringkasan') || msgLower.includes('rangkuman')) {
        return `Berikut ringkasan singkat hasil diskusi kita tentang **${activeTopic}**:\n\n1. **Konsep Dasar**: Pemahaman intuitif tentang prinsip dasar ${activeTopic}.\n2. **Penerapan**: Menghubungkan variabel & rumus ke dalam kasus sederhana.\n3. **Kesimpulan**: Kamu dapat memecahkan masalah secara mandiri dengan langkah yang sistematis.\n\nApakah ada poin ringkasan yang ingin kamu dalami lagi?`;
    }

    if (msgLower.includes('latihan') || msgLower.includes('soal')) {
        return `Ini dia latihan soal interaktif untuk **${activeTopic}**:\n\n**Soal**: Sebuah benda memiliki massa 5 kg dan diberikan gaya sebesar 20 N. Berapakah percepatan yang dialami benda tersebut?\n\n*Petunjuk*: Ingat kembali perbandingan antara gaya (F), massa (m), dan percepatan (a). Coba tuliskan langkah jawabanmu!`;
    }

    if (msgLower.includes('mekanisme') || (msgLower.includes('bagaimana') && msgLower.includes('diskusi'))) {
        return `Mekanisme diskusi ini menggunakan metode **Sokrates (Socratic)**:\n- Aku tidak akan langsung memberikan jawaban instan.\n- Aku akan memberikan pertanyaan pemantik secara bertahap agar kamu bisa menemukan jawabannya sendiri.\n- Diskusi berlangsung interaktif sampai kamu benar-benar paham!`;
    }

    if (mode === 'guided') {
        const guidedResponses = [
            `Bagus sekali! Pada materi **${activeTopic}**, konsep dasarnya sebenarnya sangat sederhana jika kita bayangkan secara visual. Langkah pertamanya adalah mengidentifikasi komponen yang sudah diketahui terlebih dahulu. Menurutmu, komponen apa yang paling jelas dari pertanyaanmu?`,
            `Penjelasan yang menarik! Mari kita bedah langkah kedua. Sekarang kita substitusi nilai yang diketahui ke dalam persamaan dasar ${activeTopic}. Coba hitung berapa hasilnya!`,
            `Tepat! Kamu sudah berada di jalur yang benar. Sekarang mari kita simpulkan contoh soal ini secara menyeluruh.`
        ];
        return guidedResponses[userMsgCount % guidedResponses.length];
    }

    if (mode === 'latihan') {
        if (msgLower.includes('siap') || msgLower.includes('mulai')) {
            return `Siap! Mari kita mulai latihan soal **${activeTopic}**:\n\n**Soal 1**: Jika sebuah segitiga siku-siku memiliki sisi depan = 3 dan sisi miring = 5, berapa nilai dari Sinus sudut tersebut?\n\nA. 3/5\nB. 4/5\nC. 5/3\nD. 3/4\n\nJawab dengan memilih opsi atau menuliskan alasanmu ya!`;
        }
        return `Jawabanmu sungguh luar biasa! 🎯 Langkah dan penalaranmu sangat tepat untuk soal **${activeTopic}** ini. Apakah kamu ingin mencoba soal berikutnya dengan tingkat kesulitan yang sedikit lebih menantang?`;
    }

    // Socratic Default
    const socraticResponses = [
        `Pertanyaan yang sangat menarik tentang **${activeTopic}**! Sebelum kita melangkah lebih jauh, menurutmu apa hubungan utama antara konsep yang kamu tanyakan dengan materi dasar yang sudah kita bahas sebelumnya?`,
        `Analisis yang bagus sekali! Nah, jika variabel atau kondisi pada pertanyaanmu tersebut kita ubah nilainya menjadi dua kali lipat, menurutmu bagaimana pengaruhnya terhadap hasil akhirnya?`,
        `Tepat sekali! Penalaranmu sangat logis. Sekarang coba kaitkan prinsip tersebut dengan rumus atau konsep dasar **${activeTopic}** yang pernah kamu pelajari.`,
        `Luar biasa! Kamu berhasil membedah dan menemukan konsepnya secara mandiri. Berdasarkan seluruh diskusi kita tadi, coba rumuskan kesimpulanmu sendiri ya! 🌟`
    ];

    let response = socraticResponses[(userMsgCount - 1) % socraticResponses.length] || socraticResponses[0];
    if (userMsgCount >= 4) {
        response += "\n\nBerdasarkan diskusi kita, coba simpulkan pemahamanmu sendiri ya!";
    }
    return response;
};

app.post('/api/chat/message', authenticateToken, async (req, res) => {
    const { message, sessionId, seedHistory, mode, topic } = req.body;
    const userId = req.user.id;
    let currentSessionId = sessionId;

    try {
        // 1. Get or Create Session
        if (!currentSessionId) {
            try {
                const { data: newSession, error: sError } = await supabase
                    .from('chat_sessions')
                    .insert([{ user_id: userId }])
                    .select()
                    .single();
                if (!sError && newSession) {
                    currentSessionId = newSession.id;
                }
            } catch (err) {
                currentSessionId = 'session-demo-' + Date.now();
            }

            // Seed initial history if provided
            if (seedHistory && Array.isArray(seedHistory) && currentSessionId && !currentSessionId.startsWith('session-demo')) {
                const seedMessages = seedHistory.map(msg => ({
                    session_id: currentSessionId,
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content
                }));
                await supabase.from('messages').insert(seedMessages).catch(() => {});
            }
        }

        // 2. Fetch History for Context
        let history = [];
        if (currentSessionId && !currentSessionId.startsWith('session-demo')) {
            const { data } = await supabase
                .from('messages')
                .select('role, content')
                .eq('session_id', currentSessionId)
                .order('created_at', { ascending: true });
            history = data || [];
        }

        const userMsgCount = history ? history.filter(m => m.role === 'user').length : 0;

        // 3. Try Gemini API, with automatic Dummy fallback if quota/API fails
        let aiResponse = '';
        try {
            const activeTopic = topic || 'Topik yang sedang dipilih';
            const activeMode = mode || 'socratic';
            
            let systemPrompt = `Kamu adalah Socratic AI tutor bernama PahamIn. Saat ini kamu mendampingi siswa untuk mempelajari topik "${activeTopic}".`;
            if (activeMode === 'guided') {
                systemPrompt = `Kamu adalah AI tutor PahamIn dalam mode Guided Practice untuk mempelajari topik "${activeTopic}".`;
            } else if (activeMode === 'latihan') {
                systemPrompt = `Kamu adalah AI tutor PahamIn dalam mode Latihan Soal untuk topik "${activeTopic}".`;
            }

            const geminiHistory = [];
            let expectedRole = 'user';
            
            for (const msg of history) {
                const currentRole = msg.role === 'user' ? 'user' : 'model';
                if (geminiHistory.length === 0 && currentRole !== 'user') continue;
                
                if (currentRole === expectedRole) {
                    geminiHistory.push({
                        role: currentRole,
                        parts: [{ text: msg.content }]
                    });
                    expectedRole = expectedRole === 'user' ? 'model' : 'user';
                } else if (geminiHistory.length > 0) {
                    geminiHistory[geminiHistory.length - 1].parts[0].text += "\n" + msg.content;
                }
            }
            
            while (geminiHistory.length > 0 && geminiHistory[geminiHistory.length - 1].role !== 'model') {
                geminiHistory.pop();
            }

            const socraticModel = genAI.getGenerativeModel({ 
                model: "gemini-3.5-flash",
                systemInstruction: systemPrompt
            });

            let chat = socraticModel.startChat({
                history: geminiHistory,
                generationConfig: { maxOutputTokens: 500 }
            });

            const result = await chat.sendMessage(message);
            aiResponse = result.response.text();

            if (activeMode === 'socratic' && userMsgCount + 1 >= 4) {
                aiResponse += "\n\nBerdasarkan diskusi kita, coba simpulkan pemahamanmu sendiri ya!";
            }
        } catch (geminiError) {
            console.warn("Gemini API error or quota limit reached, falling back to Socratic Dummy AI:", geminiError.message);
            aiResponse = generateSocraticDummyResponse(message, mode, topic, userMsgCount + 1);
        }

        // 5. Save to DB if possible
        if (currentSessionId && !currentSessionId.startsWith('session-demo')) {
            await supabase.from('messages').insert([
                { session_id: currentSessionId, role: 'user', content: message },
                { session_id: currentSessionId, role: 'assistant', content: aiResponse }
            ]).catch(() => {});
        }

        res.json({
            response: aiResponse,
            sessionId: currentSessionId || ('session-demo-' + Date.now()),
            messageCount: userMsgCount + 1
        });

    } catch (error) {
        console.error(error);
        const fallbackResponse = generateSocraticDummyResponse(message, mode, topic, 1);
        res.json({
            response: fallbackResponse,
            sessionId: 'session-demo-' + Date.now(),
            messageCount: 1
        });
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
