const mongoose = require("mongoose")
const productModel = require('../models/product.model')

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required:true
    },
    code: {
        required: true,
        unique: true,
        type: Number
    },
    request_date: {
        required: true,
        type: Date,
        default: Date.now()
    },
    from: { enum: ['Instagram', 'Facebook', 'whatsApp', 'Facebook Adds'],type:String },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            size: { enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXl'], type: String },
            color: { type: String },
            status: { enum: ['Done', 'Recall', 'Cancel', 'Inprogress'], type: String, default: 'Inprogress' },
            quantity: { type: Number, default: 1 }
        }
    ],
    notes: { type: String },
    shippingBy: { type: String },
    delivery_date: {type: Date},
}, {
    timestamps:true
})


const order = mongoose.model("Order", orderSchema);

module.exports = order