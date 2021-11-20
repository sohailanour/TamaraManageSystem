const mongoose = require('mongoose')

const isCustomerData = async (value) => {
    const customerModel = require('../models/customer.model')
    const customer = await customerModel.find({ 'phones.includes': value })
    if (customer) return true
    else return false
}

const orderSchema = new mongoose.Schema({
    code: {
        required: true,
        unique: true,
        type: Number
    },
    customerPhone: {
        required: true,
        type: String,
        match: '/^01[0125][0-9]{8}$/',
        validate(value) {
            if (!isCustomerData(value)) throw new Error("invalid customer number ")
        }
    },
    request_date: {
        required: true,
        type: Date,
    },
    from: { enum: ['Instagram', 'Facebook', 'whatsApp', 'Facebook Adds'] },
    products: [
        {
            productname: { type: String, required: true },
            size: { enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXl'] },
            color: { type: String },
            status: { enum: ['Done', 'Recall', 'Cancel', 'Replace'] },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    notes: { type: String },
    shippingBy: { type: String },
    delivery_date: {
        type:Date()
    }
})

const order = mongoose.model('Order', orderSchema)

module.exports = order