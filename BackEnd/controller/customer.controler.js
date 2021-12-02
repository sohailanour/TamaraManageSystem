const customerModel = require('../models/customer.model')


class Customer {
    static addNewcustomer = async (req, res) => {
        try {
            if (req.body.phones.length == 0) throw new Error("at least one phone required")
            const newcustomer = new customerModel(req.body)
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
            if (!req.body.phone1 && !req.body.phone1) throw new Error("at least one phone required")
            let customer = await customerModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                phones: [{ phone: req.body.phone1 }, { phone: req.body.phone2 }],
                address: {
                    city: req.body.city,
                    area: req.body.area,
                    details: req.body.details
                },
                rate: req.body.rate
            })
            if (!customer) throw new Error("customer not found")
            await customer.save()
            res.send({ apistatus: true, message: "customer edited succsses", data: customer })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "customer edited false" })
        }
    }
    static deletecustomer = async (req, res) => {
        try {
            const customer = await customerModel.findByIdAndDelete(req.params.id)
            if (!customer) throw new Error("customer not found")
            res.send({ apistatus: true, message: "customer deleted succsses", data: customer })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "customer deleted false" })
        }
    }
    static deleteAll = async (req, res) => {
        try {
            await customerModel.deleteMany()
            res.send({ apistatus: true, message: "all customers deleted succsses" })
        } catch (e) {
            res.send({ apistatus: false, data: e.message, message: "customers deleted false" })
        }
    }
    static cutomerOrders = async (req, res) => {
        try {
            const customer = await customerModel.findById(req.params.id)
            await customer.populate({
                path: "customerOrders",
                options: { limit: 10 }
            })
            res.status(200).send({
                apiStatus: true, message: "data fetched",
                // data: { customer, ...customer.customerOrders }
                customer, orders: customer.customerOrders
            })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, message: e.message })
        }
    }
}

module.exports = Customer