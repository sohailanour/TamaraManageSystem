const orderModel = require('../models/order.model')

class order{
    static addNeworder = async (req, res) => {
        try {
            const neworder = new orderModel(req.body)
       
            await neworder.save()
            res.send({ apistatus: true, data: neworder, message: "order added succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "order can't added" })
        }
    }
    static allorders = async (req, res) => {
        try {
            const orders = await orderModel.find();
            res.send({ apistatus: true, data: orders, message: "data feched success" })
        } catch (e) {
            res.send({ apistatus: false, message: "data feched false" })
        }
    }
    // static editorder = async (req, res) => {
    //     try {
    //         let order = await orderModel.findOne({ _id: req.params.id })
    //         if(!order) throw new Error("order not found")
    //         let d;
    //         for (d in req.body) order[d] = req.body[d]
    //         await order.save()
    //         res.send({ apistatus: true, message: "order edited succsses", data: order })
    //         } catch (e) {
    //             res.send({ apistatus: false, data: e.message, message: "order edited false" })
    //         }
    // }
    // static deleteorder = async (req, res) => {
    //     try{
    //         const order = await orderModel.findByIdAndDelete(req.params.id)
    //         if(!order) throw new Error("order not found")
    //         res.send({ apistatus: true, message: "order deleted succsses", data: order })
    //     } catch (e) {
    //         res.send({ apistatus: false, data: e.message, message: "order deleted false" })
    //     }
    // }
    // static deleteAll = async (req, res) => {
    //     try{
    //         await orderModel.deleteMany()
    //         res.send({ apistatus: true, message: "all orders deleted succsses" })
    //     } catch (e) {
    //         res.send({ apistatus: false, data: e.message, message: "orders deleted false" })
    //     }
    // }
}



module.exports = order