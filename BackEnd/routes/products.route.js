const router = require('express').Router()
const controller = require('../controller/products.contorller')
const auth = require("../middleware/auth")

router.get("", auth("Admin"), controller.allProducts)
router.post("/addnewproduct", auth("Admin"), controller.addNewProduct)
router.patch("/editproduct/:id", auth("Admin"), controller.editproduct)
router.delete("/deleteproduct/:id", auth("Admin"), controller.deleteproduct)
router.delete("/deleteall", auth("Admin"), controller.deleteAll)
router.get("/productdetails/:id", auth(["Admin", "DataEntry"]), controller.productOrdersDeatils)
module.exports = router