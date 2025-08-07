<<<<<<< HEAD
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getMockData, isUsingMockData } = require('../config/database');

// Registrar usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'consumer' } = req.body;

    if (isUsingMockData()) {
      return res.status(400).json({
        success: false,
        message: 'Registro não disponível no modo demo'
      });
    }

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Gerar token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao registrar usuário'
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (isUsingMockData()) {
      const mockData = getMockData();
      const user = mockData.users.find(u => u.email === email);
      
      if (!user || password !== 'demo123') {
        return res.status(401).json({
          success: false,
          message: 'Credenciais inválidas (modo demo)'
        });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      return res.json({
        success: true,
        message: 'Login realizado com sucesso (modo demo)',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token
        }
      });
    }

    // Buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Gerar token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login'
    });
  }
};

// Verificar token
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    
    if (isUsingMockData()) {
      const mockData = getMockData();
      const user = mockData.users.find(u => u._id === decoded.userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido'
        });
      }

      return res.json({
        success: true,
        message: 'Token válido (modo demo)',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        }
      });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    res.json({
      success: true,
      message: 'Token válido',
      data: { user }
    });
  } catch (error) {
    console.error('❌ Erro na verificação do token:', error);
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

// Logout (opcional - token é invalidado no frontend)
exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
=======
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
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
};