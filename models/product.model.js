const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true
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
    colors: [{
        color: { required: true, type: String },
        totalQuantity: { required: true, type: Number },
        sold: { type: Number },
        availabel: { type: Number },
        requests: { type: Number },
    }],
},{
    timestamps:true
})

const product = mongoose.model("Product", productSchema);

module.exports = product;