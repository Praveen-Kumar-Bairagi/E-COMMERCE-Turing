
const knex = require('../database/turingdb')


//post Order
exports.createOrders = async (req, res) => {
    await knex
        .select('*')
        .from('shopping_cart')
        .where('cart_id', req.body.cart_id)
        .join("product", function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        })
        .then((data) => {
            knex("orders").insert({
                "total_amount": data[0].quantity * data[0].price,
                "created_on": new Date(),
                "customer_id": req.data.customer_id,
                "shipping_id": req.body.shipping_id,
                "tax_id": req.body.tax_id
            })
                .then((result) => {
                    knex("order_detail").insert({
                        "unit_cost": data[0].price,
                        "quantity": data[0].quantity,
                        "product_name": data[0].name,
                        "attributes": data[0].attributes,
                        "product_id": data[0].product_id,
                        "order_id": result[0]
                    })
                        .then((detail) => {
                            knex.select("*").from("shopping_cart").where("cart_id", req.body.cart_id).delete()
                                .then(() => {
                                    res.send({ "order Id": result[0] })
                                }).catch(() => {
                                    res.send({ "error": "error in deleting data" })
                                })
                        }).catch(() => {
                            res.send({ "error": "error in insserting data in orders detail." })
                        })

                })
               
        })
        .catch((er) => {
            console.log(er);
            res.send({ "error": "cart id not found..." })
        })
}

exports.getOrdersById = async (req, res) => {
    await knex.select("*")
        .from('orders')
        .where("order_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getOrdersbyCustomer = async (req, res) => {
    await knex.select("*")
        .from('orders')
        .where("customer_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getshortdetailsOrdersbyId = async (req, res) => {
    await knex.select("*")
        .from('order_detail')
        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}