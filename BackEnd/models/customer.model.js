const mongoose = require("mongoose")
// const validator = require('validator')

const customerSchema = new mongoose.Schema({
    phones: [{
        phone: {
            unique: [true, "phone is signed before"],
            type: String,
            match: /^01[0125][0-9]{8}$/,
        }
    }],
    name: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        city: { type: String,  },
        area: { type: String,  },
        details: { type: String }
    },
    numberoforders: {
        type: Number,
        // value:
    },
    rate: {
        type: Number,
        min: 1,
        max: 10
    }
}, {
    timestamps:true
})

customerSchema.virtual('customerOrders',{
    ref:"Order",
    localField:"_id",
    foreignField: "customerId",
    count:true
})

const customer = mongoose.model("Customer", customerSchema);

module.exports = customer