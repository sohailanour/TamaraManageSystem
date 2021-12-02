const productModel = require('../models/product.model')
const customerModel = require('../models/customer.model')
const orderModel = require('../models/order.model')

createObjectsArray = (reqData,numberOfObjects,elementsArray) => {
    let Objects = []
    for (let i = 1; i <= numberOfObjects; i++){
        let objectData = { }
        for (e of elementsArray) {
            if (reqData[`${e}${i}`]) objectData[e] = reqData[`${e}${i}`]
        }
        Objects.push(objectData)
    }
    return Objects
}

addToStock = async(newOrder) => {
    for (productOrder of newOrder) {
        let product = await productModel.findOne({ 'colors._id': productOrder.productId })
        let cIndex = product.colors.findIndex(c => c._id.toString() == productOrder.productId.toString())
        if (cIndex != -1) {
            if (productOrder.status == 'Inprogress') product.colors[cIndex].requests += 1
            else if (productOrder.status == 'Done') product.colors[cIndex].sold += 1
            await product.save()
        }
    }
}

removeFromStock = async (oldOrder) => {
    for (productOrder of oldOrder) {
        let product = await productModel.findOne({ 'colors._id': productOrder.productId }).select('colors')
        let cIndex = product.colors.findIndex(c => c._id.toString() == productOrder.productId.toString())
        if (cIndex != -1) {
            if (productOrder.status = 'Inprogress') product.colors[cIndex].requests -= 1
            else if (productOrder.status = 'Done') product.colors[cIndex].sold -= 1
            await product.save()
        }
    }
}

resetAllStock = async () => {
    let products = await productModel.find().select('colors')
    for (p of products) {
        p.colors.forEach(ele => {
            ele.requests = 0;
            ele.sold=0
        })
        p.save()
    }
    
    // console.log(products)

    // products.save()
}

module.exports = {
    createObjectsArray,
    addToStock,
    removeFromStock,
    resetAllStock
}