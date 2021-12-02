const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")

class User {
    static register = async(req, res) =>{
        try{
            const userData = new userModel(req.body)
            await userData.save()
            res.status(200).send({ apiStatus: true, message: "data added successfuly", data: userData })
        }
        catch(e){
            res.status(500).send({ apiStatus: false, message: "email is used before" })
        }
    }

    static login = async(req,res)=>{
        try{
            const user = await userModel.loginUser(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({apiStatus:true, message:"data added successfuly", data: {token,user}})
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }

    static allUsers = async(req, res)=>{
        try{
            const usersData = await userModel.find()
            const filterData = usersData.filter(u => u.email != "sohailanour@gmail.com")
            res.status(200).send({apiStatus:true, message:"data fetched successfuly", data: filterData})
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }

    static profile =async(req,res)=>{
        try {
            res.status(200).send({ apiStatus: true, message: "user login successfuly", data: req.user })
        } catch (e) {
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }

    static logOutAll = async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({ apiStatus: true, message: "user logout all successfuly" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }

    static logOut = async (req, res) => {
        try{
            req.user.tokens = req.user.tokens.filter(t => {
                console.log(t)
                return t.token != req.token
            })
            await req.user.save()
            res.status(200).send({ apiStatus: true, message: "user logout successfuly" })
        }
        catch(e){
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }

    static deleteUSer = async (req, res) => {
        try {
            let user = await userModel.findOneAndDelete({ _id: req.params.id })
            if (!user) throw new Error("something wrong, you can't delete this user")
            res.status(200).send({ apiStatus: true, message: "user deleted" })
        } catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }

    static deleteMyacount = async (req, res) => {
        try {
            let user = await userModel.findOneAndDelete({ _id: req.user._id })
            if (!user) throw new Error("something wrong, you can't delete this acount")
            res.status(200).send({ apiStatus: true, message: "user deleted" })
        } catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }

    static editProfile = async (req, res) => {
        try {
            if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 8)
            const userData = await userModel.findByIdAndUpdate(req.user._id, req.body)
            res.status(200).send({ apiStatus: true, message: "data edited successfuly",data:userData })
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }

    static edituser = async (req, res) => {
        try {
            if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 8)
            const userData = await userModel.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).send({ apiStatus: true, message: "data edited successfuly",data:userData })
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }

    static getUser = async (req, res) => {
        try{
            const userData = await userModel.findById(req.params.id)
            // console.log(userData)
            res.status(200).send({ apiStatus: true, message: "data fetched successfuly", data: userData })
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:e.message})
        }
    }

}

module.exports = User