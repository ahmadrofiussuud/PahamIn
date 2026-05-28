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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        const { message, sessionId } = req.body;
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
        }

        // 2. Fetch History for Context
        const { data: history } = await supabase
            .from('messages')
            .select('role, content')
            .eq('session_id', currentSessionId)
            .order('created_at', { ascending: true });

        // Count user messages
        const userMsgCount = history.filter(m => m.role === 'user').length;

        // 3. Prepare AI Request
        const systemPrompt = `Kamu adalah Socratic AI tutor bernama PahamIn. 
        ATURAN WAJIB: Kamu TIDAK BOLEH memberikan jawaban langsung. Setiap kali siswa bertanya, kamu HARUS merespons dengan pertanyaan pemantik yang mendorong siswa berpikir sendiri. Selalu mulai dengan menanyakan apa yang sudah siswa ketahui tentang topik tersebut. Gunakan bahasa Indonesia yang ramah dan supportif.`;

        let chat = model.startChat({
            history: history.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
            })),
            generationConfig: { maxOutputTokens: 500 }
        });

        const result = await chat.sendMessage([
            { text: `SYSTEM_INSTRUCTION: ${systemPrompt}` },
            { text: message }
        ]);
        
        let aiResponse = result.response.text();

        // 4. Logic: Every 4 user messages, inject conclusion prompt
        if (userMsgCount + 1 >= 4) {
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
