const router = require('express').Router()
const controller = require('../controller/customer.controler')

router.get("/", controller.allcustomers)
router.post("/addnewcustomer", controller.addNewcustomer)
router.put("/editcustomer/:id", controller.editcustomer)
router.delete("/deletecustomer/:id", controller.deletecustomer)
router.delete("/deleteall", controller.deleteAll)

module.exports = router