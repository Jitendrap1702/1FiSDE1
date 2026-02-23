const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emiPlansSchema = new Schema({
    tenure: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    monthlyPayment: {
        type: Number,
        required: true
    },
    downPayment: {
        type: Number,
        required: true
    }
},
{
    _id: false
});

const variantSchema = new Schema({
    storage: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    emiPlans: [emiPlansSchema]
});

const colorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hex: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ]
});

const productSchema = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    cashback: {
        type: Number,
        required: true
    },
    variants: [variantSchema],
    colors: [colorSchema]
},
{
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);