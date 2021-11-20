require("dotenv").config()
require('../db/dbConnection')
const express = require("express")
const cors = require('cors')
const productRoutes = require('../routes/products.route')
const customerRoutes = require('../routes/customers.route')
const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/manage/products', productRoutes)
app.use('/api/manage/customers',customerRoutes )

app.get("*", (req,res)=>{
    res.status(404).send({
        apiStatus:false,
        message:"api invalid link"
    })
})

module.exports = app