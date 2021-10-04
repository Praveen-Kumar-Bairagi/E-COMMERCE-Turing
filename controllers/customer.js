const knex = require('../database/turingdb')
// const bcrypt=require('bcrypt')
const { generateAccessToken } = require('../Auth/jwt')
exports.getCustomerId = async (req, res) => {
    await knex.select("*")
        .from('customer')
        .where("customer_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.customerSign = async (req, res) => {
    const userdata = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    knex('customer').insert(userdata)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.customerLog = async (req, res) => {
    
    knex.select("*")
        .from('customer')
        .where('email', req.body.email)
        .where('password', req.body.password)
        .then((data) => {
            if (data[0].password === req.body.password) {
                const token = generateAccessToken({ customer_id: data[0].customer_id, email: req.body.email });
                res.cookie('token', token)
                console.log(data);
                res.send(data)
            }
            else {
                res.json({ 'message': "login error" })
            }
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.updateCustomer = async (req, res) => {
    knex('customer')
        .where('customer_id', req.data.customer_id)
        .update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            day_phone: req.body.day_phone,
            eve_phone: req.body.eve_phone,
            mob_phone: req.body.mob_phone
        })
        .then((data) => {
            console.log(data);
            res.sendStatus(200)

        })
        .catch((er) => {
            console.log(er);
        })
}


exports.updateCustomerAddress = async (req, res) => {
    knex('customer')
        .where('customer_id', req.data.customer_id)
        .update({
            address_1: req.body.address_1,
            address_2: req.body.address_2,
            city: req.body.city,
            region: req.body.region,
            postal_code: req.body.postal_code,
            country: req.body.country,
            shipping_region_id: req.body.shipping_region_id
        })
        .then((data) => {
            console.log(data);
            res.sendStatus(200)

        })
        .catch((er) => {
            console.log(er);
        })
}


exports.updateCustomerCreditinfo = async (req, res) => {
    knex('customer')
        .where('customer_id', req.data.customer_id)
        .update({
            credit_card: req.body.credit_card
        })
        .then((data) => {
            console.log(data);
            res.sendStatus(200)

        })
        .catch((er) => {
            console.log(er);
        })
}