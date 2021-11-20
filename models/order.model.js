const mongoose = require("mongoose")

const customerModel = require('./customer.model')
const productModel = require('./product.model')

const isValidData = async (modelname,value) => {
    const document = await modelname.find(value);
    if (document.length == 0) return false
    return true
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
        async validate(value) {
            const validData = await isValidData(customerModel, { 'phones.phone': value })
            if (!validData) throw new Error("invalid customer phone")
        }
    },
    request_date: {
        required: true,
        type: Date,
    },
    from: { enum: ['Instagram', 'Facebook', 'whatsApp', 'Facebook Adds'] },
    products: [
        {
            productname: {
                type: String,
                required: true,
                async validate(value) {
                    const validData = await isValidData(productModel, {'name': value})
                    if (!validData) throw new Error("invalid product name")
                }
            },
            size: { enum: ['S', 'M', 'L', 'XL', 'XXL', 'XXXl'], },
            color: { type: String },
            status: {enum: ['Done', 'Recall', 'Cancel', 'Replace', 'inprogress'] },
            quantity: {
                type: Number,
                default: 1
            }
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