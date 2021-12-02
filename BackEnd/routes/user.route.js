const router = require("express").Router()

const controller = require("../controller/user.controller")
const auth = require("../middleware/auth")

router.post('/register', auth(["SAdmin" , "Admin"]), controller.register)
router.post('/login', controller.login)
router.get('/profile',auth(""), controller.profile)
router.get('', auth(["Admin", "SAdmin"]), controller.allUsers)
router.get('/logout', auth(""), controller.logOut)
router.get('/logoutAll', auth(""), controller.logOutAll)
router.delete('/deleteUser/:id', auth("Admin"), controller.deleteUSer)
router.delete('/deleteUser', auth(""), controller.deleteMyacount)
router.patch('/editProfile', auth(""), controller.editProfile)
router.patch('/edituser/:id', auth(""), controller.edituser)
router.get('/getuser/:id', auth(""), controller.getUser)

module.exports = router