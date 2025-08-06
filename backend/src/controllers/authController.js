const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, role = 'consumer' } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'Usuário já existe com este email' 
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword,
            role 
        });
        
        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { 
                userId: newUser._id, 
                email: newUser.email, 
                role: newUser.role 
            },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        );

        // Return user data without password
        const userData = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        };

        res.status(201).json({ 
            success: true,
            message: 'Usuário registrado com sucesso!',
            token,
            user: userData
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Erro ao registrar usuário',
            error: error.message 
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Credenciais inválidas' 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Credenciais inválidas' 
            });
        }

        // Generate token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email, 
                role: user.role 
            },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '7d' }
        );

        // Return user data without password
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            level: 'Bronze', // Default level
            points: 0,       // Default points
            createdAt: user.createdAt
        };

        res.status(200).json({ 
            success: true,
            message: 'Login realizado com sucesso!',
            token,
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Erro ao fazer login',
            error: error.message 
        });
    }
};