const mongoose = require("mongoose")
// const validator = require('validator')

const customerSchema = new mongoose.Schema({
    phones: [{
        phone: {
            unique: [true, "phone is signed before"],
            required: [true, "phone is required"],
            type: String,
            match: /^01[0125][0-9]{8}$/,
        }
    }],
    name: {
        type: String,
        trim: true,
        required: true
    },
    address: [{
        city: { type: String, require: true },
        area: { type: String, required: true },
        details: { type: String }
    }],
    numberoforders: { type: Number },
    rate: {
        type: Number,
        min: 1,
        max: 10
    }
}, {
    timestamps:true
})

const customer = mongoose.model("Customer", customerSchema);

module.exports = customer