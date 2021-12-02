const orderModel = require('../models/order.model')
const {createObjectsArray,addToStock,removeFromStock,resetAllStock} = require('./helper.controler')


class Order{
    static addNeworder = async (req, res) => {
        try {
            // let products = createObjectsArray(req.body, req.body.numberOfProducts,
            //     ['productId', 'size', 'color', 'status', 'quantity']);      
            console.log(req.body)
            const neworder = new orderModel(req.body)
            await neworder.save()
            await addToStock(req.body.products)
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
            res.send({ apistatus: false,message:e.message, data: "data feched false" })
        }
    }
    static editorder = async (req, res) => {
        try {
            let products = createObjectsArray(req.body, req.body.numberOfProducts,
                ['productId', 'size', 'color', 'status', 'quantity']);
            console.log(products)
            let order = await orderModel.findById(req.params.id)
            if(!order) throw new Error("order not found")
            await removeFromStock(order.products)
            console.log(order)

            order = await orderModel.findByIdAndUpdate(req.params.id, { products, ...req.body })
            await order.save()
            // console.log(order)
            await addToStock(products)

            res.send({ apistatus: true, message: "order edited succsses", data: order })
            } catch (e) {
                res.send({ apistatus: false, data: e.message, message: "order edited false" })
            }
    }
    static deleteorder = async (req, res) => {
        try{
            const order = await orderModel.findByIdAndDelete(req.params.id)
            if (!order) throw new Error("order not found")
            await removeFromStock(order)
            res.send({ apistatus: true, message: "order deleted succsses", data: order })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "order deleted false" })
        }
    }
    static deleteAll = async (req, res) => {
        try{
            await orderModel.deleteMany()
            resetAllStock()
            res.send({ apistatus: true, message: "all orders deleted succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "orders deleted false" })
        }
    }
}

module.exports = Order