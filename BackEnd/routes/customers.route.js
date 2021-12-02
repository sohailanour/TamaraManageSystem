const router = require('express').Router()
const controller = require('../controller/customer.controler')
const auth = require('../middleware/auth')

router.get("/",auth(["Admin", "DataEntry"]), controller.allcustomers)
router.post("/addnewcustomer",auth(["Admin", "DataEntry"]), controller.addNewcustomer)
router.patch("/editcustomer/:id",auth(["Admin", "DataEntry"]), controller.editcustomer)
router.delete("/deletecustomer/:id",auth(["Admin", "DataEntry"]), controller.deletecustomer)
router.delete("/deleteall",auth("Admin"), controller.deleteAll)
router.get("/customerOrders/:phone",auth(["Admin", "DataEntry"]), controller.cutomerOrders)

module.exports = router