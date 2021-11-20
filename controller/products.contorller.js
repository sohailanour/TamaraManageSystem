const productModel = require('../models/product.model')

checkArrayColors = (colors) => {
    let colorsArr = []
    let i = 0;
    while (i < colors.length) {
        if (colorsArr.includes(colors[i].color)) throw new Error (`${colors[i].color} color is dublicated`)
        colorsArr.push(colors[i].color)
        i++;
    }
}

class product{

    static addNewProduct = async (req, res) => {
        try {
            const newproduct = new productModel(req.body)
            checkArrayColors(newproduct.colors)
            await newproduct.save()
            res.send({ apistatus: true, data: newproduct, message: "product added succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "product can't added" })
        }
    }
    static allProducts = async (req, res) => {
        try {
            const products = await productModel.find();
            const productNames = await productModel.find().select('_id')
            console.log(productNames)
            res.send({ apistatus: true, data: products, message: "data feched success" })
        } catch (e) {
            res.send({ apistatus: false, message: "data feched false" })
        }
    }
    static editproduct = async (req, res) => {
        try {
            let product = await productModel.findOne({ _id: req.params.id })
            if(!product) throw new Error("product not found")
            let d;
            for (d in req.body) product[d] = req.body[d]
            await product.save()
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
}



module.exports = product