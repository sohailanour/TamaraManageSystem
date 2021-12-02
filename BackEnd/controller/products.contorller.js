const productModel = require('../models/product.model')
const {createObjectsArray} = require('./helper.controler')
const orderModel = require('../models/order.model')

class Product{
    static addNewProduct = async (req, res) => {        
        try {
            const newproduct = new productModel(req.body)

            await newproduct.save()
            res.send({ apistatus: true, data: newproduct, message: "product added succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "product can't added" })
        }
    }
    static allProducts = async (req, res) => {
        try {
            const products = await productModel.find();
            res.send({ apistatus: true, data: products, message: "data feched success" })
        } catch (e) {
            res.send({ apistatus: false, message: "data feched false" })
        }
    }
    static editproduct = async (req, res) => {
        try {
            let product = await productModel.findByIdAndUpdate(req.params.id, req.body)
            if (!product) throw new Error("product not found")
            product.save()
            res.send({ apistatus: true, message: "product edited succsses", data: product })
            } catch (e) {
                res.send({ apistatus: false, data: e.message, message: "product edited false" })
            }
    }
    static deleteproduct = async (req, res) => {
        try{
            const product = await productModel.findByIdAndDelete(req.params.id)
            if(!product) throw new Error("product not found")
            res.send({ apistatus: true, message: "product deleted succsses", data: product })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "product deleted false" })
        }
    }
    static deleteAll = async (req, res) => {
        try{
            await productModel.deleteMany()
            res.send({ apistatus: true, message: "all products deleted succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "products deleted false" })
        }
    }
    static productOrdersDeatils = async(req, res) => {
        try {
            const product = await productModel.findOne({ _id: req.params.id })
            await product.populate({
                path: "productOrders",
                // options: { limit: 10 }
            })
            res.status(200).send({
                apiStatus: true, message: "data fetched",
                data: { product, orders: product.productOrders }
            })
            
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }
}



module.exports = Product