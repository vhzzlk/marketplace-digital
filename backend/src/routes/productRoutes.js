const express = require('express');
const { body, param, query } = require('express-validator');
const { authMiddleware, optionalAuth, authorizeRoles } = require('../middlewares/authMiddleware');
const {
    getProducts,
    getTrendingProducts,
    getFlashSaleProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductRecommendations,
    searchProducts
} = require('../controllers/productController');

const router = express.Router();

// Validation middleware
const validateProduct = [
    body('name')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Nome deve ter entre 3 e 100 caracteres'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Descrição deve ter entre 10 e 1000 caracteres'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Preço deve ser um número positivo'),
    body('category')
        .isIn(['Fast Food', 'Pizza', 'Sushi', 'Bebidas', 'Sobremesas', 'Saladas', 'Asian', 'Mexican', 'Italian', 'Brazilian'])
        .withMessage('Categoria inválida'),
    body('imageUrl')
        .isURL()
        .withMessage('URL da imagem deve ser válida'),
    body('preparationTime')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Tempo de preparação deve ser um número inteiro positivo'),
    body('deliveryTime')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Tempo de entrega deve ser um número inteiro positivo'),
    body('stock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Estoque deve ser um número inteiro não negativo'),
    body('isLimited')
        .optional()
        .isBoolean()
        .withMessage('isLimited deve ser um valor booleano'),
    body('limitedStock')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Estoque limitado deve ser um número inteiro não negativo'),
    body('isFlashSale')
        .optional()
        .isBoolean()
        .withMessage('isFlashSale deve ser um valor booleano'),
    body('flashSaleEndsAt')
        .optional()
        .isISO8601()
        .withMessage('Data de fim da promoção deve ser uma data válida'),
    body('isTrending')
        .optional()
        .isBoolean()
        .withMessage('isTrending deve ser um valor booleano'),
    body('isFeatured')
        .optional()
        .isBoolean()
        .withMessage('isFeatured deve ser um valor booleano'),
    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags deve ser um array'),
    body('tags.*')
        .optional()
        .isString()
        .withMessage('Cada tag deve ser uma string')
];

// Public routes
router.get('/', getProducts);
router.get('/trending', getTrendingProducts);
router.get('/flash-sale', getFlashSaleProducts);
router.get('/search', searchProducts);
router.get('/recommendations', getProductRecommendations);
router.get('/:id', getProductById);

// Protected routes (seller only)
router.post('/', 
    authMiddleware, 
    authorizeRoles('seller', 'admin'),
    validateProduct,
    createProduct
);

router.put('/:id',
    authMiddleware,
    authorizeRoles('seller', 'admin'),
    [
        param('id').isMongoId().withMessage('ID inválido'),
        ...validateProduct
    ],
    updateProduct
);

router.delete('/:id',
    authMiddleware,
    authorizeRoles('seller', 'admin'),
    [
        param('id').isMongoId().withMessage('ID inválido')
    ],
    deleteProduct
);

module.exports = router; 