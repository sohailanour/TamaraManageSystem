const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const auth = (type)=>{
    return async(req,res,next)=>{
        try {
            const token = req.header("Authorization").replace("Bearer ", "")
            const decodedToken = jwt.verify(token, 'helloAll')
            const user = await userModel.findOne({_id:decodedToken._id, 'tokens.token': token})
            if (!user) throw new Error("not user")
            if (type && !type.includes(user.role)) throw new Error(`you are not ${type}`)
            req.user=user
            req.token=token
            next()
        }
        catch(e){
            res.status(500).send({apiStatus:false, message:"unauthorized", data:e.message})
            // res.send(e.message)
        }
    }

}

module.exports = auth