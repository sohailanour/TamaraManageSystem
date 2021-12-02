const mongoose = require("mongoose")
// const orderModel = require('../models/order.model')

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
     code: {
        unique:true,
        required: true,
         type: Number,
    },
    season: {
        type: String,
        trim: true
    },
    price: { type: Number },
    colors: [{
        requests: { type: Number, default: 0 },
        color: { required: true, type: String },
        quantity: { required: true, type: Number },
        sold: { type: Number, default: 0 },
        // availabel: { type: Number,},
    }],
},{
    timestamps:true
})


productSchema.virtual('productOrders',{
    ref:"Order",
    localField:"_id",
    foreignField:"products.productId"
})



const product = mongoose.model("Product", productSchema);

module.exports = product;