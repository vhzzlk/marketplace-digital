const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome do produto é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
    },
    description: {
        type: String,
        required: [true, 'Descrição do produto é obrigatória'],
        trim: true,
        maxlength: [1000, 'Descrição não pode ter mais de 1000 caracteres']
    },
    shortDescription: {
        type: String,
        trim: true,
        maxlength: [200, 'Descrição curta não pode ter mais de 200 caracteres']
    },
    price: {
        type: Number,
        required: [true, 'Preço é obrigatório'],
        min: [0, 'Preço não pode ser negativo']
    },
    originalPrice: {
        type: Number,
        min: [0, 'Preço original não pode ser negativo']
    },
    discountPercentage: {
        type: Number,
        min: [0, 'Desconto não pode ser negativo'],
        max: [100, 'Desconto não pode ser maior que 100%']
    },
    imageUrl: {
        type: String,
        required: [true, 'Imagem do produto é obrigatória']
    },
    images: [{
        type: String
    }],
    category: {
        type: String,
        required: [true, 'Categoria é obrigatória'],
        enum: {
            values: ['Fast Food', 'Pizza', 'Sushi', 'Bebidas', 'Sobremesas', 'Saladas', 'Asian', 'Mexican', 'Italian', 'Brazilian'],
            message: 'Categoria inválida'
        }
    },
    tags: [{
        type: String,
        trim: true
    }],
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating não pode ser negativo'],
        max: [5, 'Rating não pode ser maior que 5']
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: [0, 'Número de reviews não pode ser negativo']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Estoque não pode ser negativo']
    },
    isLimited: {
        type: Boolean,
        default: false
    },
    limitedStock: {
        type: Number,
        min: [0, 'Estoque limitado não pode ser negativo']
    },
    isFlashSale: {
        type: Boolean,
        default: false
    },
    flashSaleEndsAt: {
        type: Date
    },
    isTrending: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    preparationTime: {
        type: Number, // in minutes
        default: 20,
        min: [1, 'Tempo de preparação deve ser pelo menos 1 minuto']
    },
    deliveryTime: {
        type: Number, // in minutes
        default: 30,
        min: [1, 'Tempo de entrega deve ser pelo menos 1 minuto']
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vendedor é obrigatório']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for discount amount
productSchema.virtual('discountAmount').get(function() {
    if (this.originalPrice && this.price) {
        return this.originalPrice - this.price;
    }
    return 0;
});

// Virtual for savings percentage
productSchema.virtual('savingsPercentage').get(function() {
    if (this.originalPrice && this.price) {
        return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
    if (this.isLimited && this.limitedStock <= 5) {
        return 'low';
    }
    if (this.stock === 0) {
        return 'out';
    }
    return 'available';
});

// Indexes for better performance
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ isTrending: 1, isActive: 1 });
productSchema.index({ isFlashSale: 1, flashSaleEndsAt: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to update timestamps
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Static method to get trending products
productSchema.statics.getTrending = function(limit = 10) {
    return this.find({ isActive: true, isTrending: true })
        .sort({ sales: -1, rating: -1 })
        .limit(limit)
        .populate('seller', 'name avatar');
};

// Static method to get flash sale products
productSchema.statics.getFlashSale = function() {
    const now = new Date();
    return this.find({
        isActive: true,
        isFlashSale: true,
        flashSaleEndsAt: { $gt: now }
    })
    .sort({ flashSaleEndsAt: 1 })
    .populate('seller', 'name avatar');
};

// Instance method to increment views
productSchema.methods.incrementViews = function() {
    this.views += 1;
    return this.save();
};

// Instance method to increment sales
productSchema.methods.incrementSales = function(quantity = 1) {
    this.sales += quantity;
    if (this.isLimited && this.limitedStock > 0) {
        this.limitedStock = Math.max(0, this.limitedStock - quantity);
    }
    return this.save();
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;