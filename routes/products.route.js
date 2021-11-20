const router = require('express').Router()
const controller = require('../controller/products.contorller')

router.get("/", controller.allProducts)
router.post("/addnewproduct", controller.addNewProduct)
router.put("/editproduct/:id", controller.editproduct)
router.delete("/deleteproduct/:id", controller.deleteproduct)
router.delete("/deleteall", controller.deleteAll)
module.exports = router