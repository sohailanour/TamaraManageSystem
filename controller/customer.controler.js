const customerModel = require('../models/customer.model')

checkPhones = (phones) => {
    if(phones.length == 0) throw new Error (`at least one phone number is needed`)
    let phonesArr = []
    let i = 0;
    while (i < phones.length) {
        if (phonesArr.includes(phones[i].phone)) throw new Error (`${phones[i].phone} phone number is dublicated`)
        phonesArr.push(phones[i].phone)
        i++;
    }
}

class customer{

    static addNewcustomer = async (req, res) => {
        try {
            const newcustomer = new customerModel(req.body)
            checkPhones(newcustomer.phones)
            await newcustomer.save()
            res.send({ apistatus: true, data: newcustomer, message: "customer added succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "customer can't added" })
        }
    }
    static allcustomers = async (req, res) => {
        try {
            const customers = await customerModel.find();
            res.send({ apistatus: true, data: customers, message: "data feched success" })
        } catch (e) {
            res.send({ apistatus: false, message: "data feched false" })
        }
    }
    static editcustomer = async (req, res) => {
        try {
            let customer = await customerModel.findOne({ _id: req.params.id })
            if(!customer) throw new Error("customer not found")
            let c;
            for (c in req.body) customer[c] = req.body[c]
            await customer.save()
            res.send({ apistatus: true, message: "customer edited succsses", data: customer })
            } catch (e) {
                res.send({ apistatus: false, data: e.message, message: "customer edited false" })
            }
    }
    static deletecustomer = async (req, res) => {
        try{
            const customer = await customerModel.findByIdAndDelete(req.params.id)
            if(!customer) throw new Error("customer not found")
            res.send({ apistatus: true, message: "customer deleted succsses", data: customer })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "customer deleted false" })
        }
    }
    static deleteAll = async (req, res) => {
        try{
            await customerModel.deleteMany()
            res.send({ apistatus: true, message: "all customers deleted succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "customers deleted false" })
        }
    }
}

module.exports = customer