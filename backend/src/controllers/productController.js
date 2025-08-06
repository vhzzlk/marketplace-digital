const Product = require('../models/Product');
<<<<<<< HEAD
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
=======
const { validationResult } = require('express-validator');

// Get all products with advanced filtering and sorting
const getProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            category,
            minPrice,
            maxPrice,
            rating,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            search,
            featured,
            trending,
            flashSale
        } = req.query;

        // Build filter object
        const filter = { isActive: true };
        
        if (category) filter.category = category;
        if (featured === 'true') filter.isFeatured = true;
        if (trending === 'true') filter.isTrending = true;
        if (flashSale === 'true') {
            filter.isFlashSale = true;
            filter.flashSaleEndsAt = { $gt: new Date() };
        }
        
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }
        
        if (rating) filter.rating = { $gte: parseFloat(rating) };
        
        if (search) {
            filter.$text = { $search: search };
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const products = await Product.find(filter)
            .populate('seller', 'name avatar rating')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const total = await Product.countDocuments(filter);
        const totalPages = Math.ceil(total / parseInt(limit));

        // Add urgency indicators
        const productsWithUrgency = products.map(product => {
            const urgency = {
                isLimited: product.isLimited && product.limitedStock <= 10,
                isFlashSale: product.isFlashSale && product.flashSaleEndsAt > new Date(),
                isTrending: product.isTrending,
                isFeatured: product.isFeatured,
                stockStatus: product.stockStatus,
                timeLeft: product.isFlashSale ? 
                    Math.max(0, new Date(product.flashSaleEndsAt) - new Date()) : null
            };
            
            return { ...product, urgency };
        });

        res.json({
            success: true,
            data: productsWithUrgency,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar produtos'
        });
    }
};

// Get trending products
const getTrendingProducts = async (req, res) => {
    try {
        const { limit = 8 } = req.query;
        
        const products = await Product.getTrending(parseInt(limit));
        
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching trending products:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar produtos em tendência'
        });
    }
};

// Get flash sale products
const getFlashSaleProducts = async (req, res) => {
    try {
        const products = await Product.getFlashSale();
        
        // Add countdown timers
        const productsWithCountdown = products.map(product => ({
            ...product.toObject(),
            countdown: {
                timeLeft: Math.max(0, new Date(product.flashSaleEndsAt) - new Date()),
                percentage: Math.max(0, Math.min(100, 
                    ((new Date(product.flashSaleEndsAt) - new Date()) / 
                     (new Date(product.flashSaleEndsAt) - new Date(product.createdAt))) * 100
                ))
            }
        }));
        
        res.json({
            success: true,
            data: productsWithCountdown
        });
    } catch (error) {
        console.error('Error fetching flash sale products:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar produtos em promoção relâmpago'
        });
    }
};

// Get product by ID with view increment
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id)
            .populate('seller', 'name avatar rating reviewCount')
            .lean();
            
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado'
            });
        }

        // Increment view count
        await Product.findByIdAndUpdate(id, { $inc: { views: 1 } });

        // Add urgency indicators
        const urgency = {
            isLimited: product.isLimited && product.limitedStock <= 10,
            isFlashSale: product.isFlashSale && product.flashSaleEndsAt > new Date(),
            isTrending: product.isTrending,
            isFeatured: product.isFeatured,
            stockStatus: product.stockStatus,
            timeLeft: product.isFlashSale ? 
                Math.max(0, new Date(product.flashSaleEndsAt) - new Date()) : null,
            viewsToday: product.views,
            salesToday: product.sales
        };

        res.json({
            success: true,
            data: { ...product, urgency }
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar produto'
        });
    }
};

// Create new product (seller only)
const createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: errors.array()
            });
        }

        const productData = {
            ...req.body,
            seller: req.user._id
        };

        const product = new Product(productData);
        await product.save();

        res.status(201).json({
            success: true,
            message: 'Produto criado com sucesso',
            data: product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao criar produto'
        });
    }
};

// Update product (seller only)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado'
            });
        }

        // Check if user owns this product
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Você não pode editar este produto.'
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Produto atualizado com sucesso',
            data: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar produto'
        });
    }
};

// Delete product (seller only)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado'
            });
        }

        // Check if user owns this product
        if (product.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Você não pode deletar este produto.'
            });
        }

        await Product.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Produto deletado com sucesso'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar produto'
        });
    }
};

// Get product recommendations
const getProductRecommendations = async (req, res) => {
    try {
        const { productId, limit = 6 } = req.query;
        
        let recommendations = [];
        
        if (productId) {
            const product = await Product.findById(productId);
            if (product) {
                // Get products from same category with similar price range
                recommendations = await Product.find({
                    _id: { $ne: productId },
                    category: product.category,
                    isActive: true,
                    price: { 
                        $gte: product.price * 0.7, 
                        $lte: product.price * 1.3 
                    }
                })
                .sort({ rating: -1, sales: -1 })
                .limit(parseInt(limit))
                .populate('seller', 'name avatar');
            }
        } else {
            // Get trending products as recommendations
            recommendations = await Product.getTrending(parseInt(limit));
        }

        res.json({
            success: true,
            data: recommendations
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar recomendações'
        });
    }
};

// Search products with advanced features
const searchProducts = async (req, res) => {
    try {
        const { q, category, minPrice, maxPrice, rating, sortBy = 'relevance' } = req.query;
        
        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Termo de busca é obrigatório'
            });
        }

        const filter = { 
            isActive: true,
            $text: { $search: q }
        };
        
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }
        if (rating) filter.rating = { $gte: parseFloat(rating) };

        let sort = {};
        switch (sortBy) {
            case 'price_asc':
                sort = { price: 1 };
                break;
            case 'price_desc':
                sort = { price: -1 };
                break;
            case 'rating':
                sort = { rating: -1 };
                break;
            case 'newest':
                sort = { createdAt: -1 };
                break;
            default:
                sort = { score: { $meta: 'textScore' } };
        }

        const products = await Product.find(filter)
            .populate('seller', 'name avatar')
            .sort(sort)
            .limit(20)
            .lean();

        res.json({
            success: true,
            data: products,
            searchTerm: q
        });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar produtos'
        });
    }
};

module.exports = {
    getProducts,
    getTrendingProducts,
    getFlashSaleProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductRecommendations,
    searchProducts
>>>>>>> f73d985fb2c11ca1b8aeb6510f4465ea32fd8f9c
}; 