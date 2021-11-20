const router = require('express').Router()
const controller = require('../controller/orders.contorller')

router.get("/", controller.allorders)
router.post("/addneworder", controller.addNeworder)
// router.put("/editorder/:id", controller.editporduct)
// router.delete("/deleteorder/:id", controller.deleteorder)
// router.delete("/deleteall", controller.deleteAll)
module.exports = router