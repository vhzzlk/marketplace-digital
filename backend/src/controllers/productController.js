const Product = require('../models/Product');
const { getMockData, isUsingMockData } = require('../config/database');

// Buscar todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    if (isUsingMockData()) {
      const mockData = getMockData();
      return res.json({
        success: true,
        data: mockData.products,
        message: 'Produtos carregados (modo demo)'
      });
    }

    const products = await Product.find().populate('seller', 'name');
    res.json({
      success: true,
      data: products,
      message: 'Produtos carregados com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao buscar produtos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar produtos'
    });
  }
};

// Buscar produto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingMockData()) {
      const mockData = getMockData();
      const product = mockData.products.find(p => p._id === id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        });
      }

      return res.json({
        success: true,
        data: product,
        message: 'Produto encontrado (modo demo)'
      });
    }

    const product = await Product.findById(id).populate('seller', 'name');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      data: product,
      message: 'Produto encontrado'
    });
  } catch (error) {
    console.error('❌ Erro ao buscar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar produto'
    });
  }
};

// Criar novo produto
exports.createProduct = async (req, res) => {
  try {
    if (isUsingMockData()) {
      return res.status(400).json({
        success: false,
        message: 'Criação de produtos não disponível no modo demo'
      });
    }

    const productData = {
      ...req.body,
      seller: req.user.id
    };

    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      data: product,
      message: 'Produto criado com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao criar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar produto'
    });
  }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingMockData()) {
      return res.status(400).json({
        success: false,
        message: 'Atualização de produtos não disponível no modo demo'
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      data: product,
      message: 'Produto atualizado com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar produto'
    });
  }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isUsingMockData()) {
      return res.status(400).json({
        success: false,
        message: 'Exclusão de produtos não disponível no modo demo'
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Produto deletado com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao deletar produto:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar produto'
    });
  }
};

// Buscar produtos por categoria
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (isUsingMockData()) {
      const mockData = getMockData();
      const products = mockData.products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
      
      return res.json({
        success: true,
        data: products,
        message: `Produtos da categoria ${category} (modo demo)`
      });
    }

    const products = await Product.find({
      category: { $regex: category, $options: 'i' }
    }).populate('seller', 'name');

    res.json({
      success: true,
      data: products,
      message: `Produtos da categoria ${category}`
    });
  } catch (error) {
    console.error('❌ Erro ao buscar produtos por categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar produtos por categoria'
    });
  }
}; 