const router = require('express').Router()
const controller = require('../controller/orders.contorller')
const auth = require("../middleware/auth")

router.get("/", auth(["Admin", "DataEntry"]), controller.allorders)
router.post("/addneworder", auth(["Admin", "DataEntry"]), controller.addNeworder)
router.patch("/editorder/:id",auth(["Admin", "DataEntry"]), controller.editorder)
router.delete("/deleteorder/:id",auth(["Admin", "DataEntry"]), controller.deleteorder)
router.delete("/deleteall", auth("Admin"), controller.deleteAll)

module.exports = router