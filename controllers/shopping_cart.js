const knex = require('../database/turingdb')
const random = require('randomstring')
exports.genrateUniqId = async (req, res) => {
    const cart_id = random.generate(
        {
            charset: "alphanumeric"
        }
    )
    console.log(cart_id)
    res.send(`this is your cart_id : ${cart_id}`)

}

exports.addProductToCart = async (req, res) => {
    const cart_data = {
        'cart_id': req.body.cart_id,
        'product_id': req.body.product_id,
        'attributes': req.body.attributes,
        'quantity': 1,
        'added_on': new Date()
    }
    knex.select('quantity')
        .from('shopping_cart')
        .where('shopping_cart.cart_id', cart_data.cart_id)
        .andWhere('shopping_cart.product_id', cart_data.product_id)
        .andWhere('shopping_cart.attributes', cart_data.attributes)
        .then((data) => {
            if (data.length == 0) {
                // for quantity
                knex('shopping_cart')
                    .insert({
                        'cart_id': cart_data.cart_id,
                        'product_id': cart_data.product_id,
                        'attributes': cart_data.attributes,
                        'quantity': 1,
                        'added_on': new Date()
                    })
                    .then(() => {
                        knex
                            .select(
                                'item_id',
                                'name',
                                'attributes',
                                'shopping_cart.product_id',
                                'price',
                                'quantity',
                                'image'
                            )
                            .from('shopping_cart')
                            .join('product', function () {
                                this.on('shopping_cart.product_id', 'product.product_id')
                            })
                            .then(data => {

                                let datas = []
                                for (let i of data) {
                                    let subtotal = i.price * i.quantity;
                                    i.subtotal = subtotal;
                                    // console.log(i);
                                    datas.push(i);
                                }
                                console.log(datas)
                                res.send(data);
                            }).catch(err => console.log(err));
                    }).catch((err) => console.log(err))
            }
        })
        .catch((er) => {
            console.log(er);
        })
}


exports.getShoppingCartById = async (req, res) => {
    await knex.select(
        'item_id',
        'name',
        'attributes',
        'shopping_cart.product_id',
        'price',
        'quantity',
        'image')
        .from('shopping_cart')
        .join('product', function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        })
        .where('shopping_cart.cart_id', req.params.id)
        .then((data) => {
            let result = []
            for (var i of data) {
                let subtotal = i.price * i.quantity;
                i.subtotal = subtotal;
                result.push(i);
            }
            console.log(result);
            res.send(result);
        })
        .catch((er) => {
            console.log(er);
        })
}

//update cart by  cart_id
exports.updateCart = async (req, res) => {
    knex('shopping_cart')
        .where('shopping_cart.item_id', req.params.id)
        .update({
            'quantity': req.body.quantity
        })

        .then(() => {
            knex
                .select(
                    'item_id',
                    'product.name',
                    'shopping_cart.attributes',
                    'shopping_cart.product_id',
                    'product.price',
                    'shopping_cart.quantity',
                    'product.image'
                )
                .from('shopping_cart')
                .where('shopping_cart.item_id', req.params.id)
                .join('product', function () {
                    this.on('shopping_cart.product_id', 'product.product_id')
                })
                .then((data) => {
                    let result = [];
                    for (let i of data) {
                        let subtotal = i.price * i.quantity;
                        i.subtotal = subtotal;
                        result.push(i);
                    }
                    console.log({ "Great": "data updated!" });
                    res.send(result);
                }).catch(err => console.log(err));
        }).catch((err) => {
            console.log(err)
        })
}

exports.emptyCart = async (req, res) => {
    await knex.select("*")
        .from('shopping_cart')
        .where('shopping_cart.cart_id', req.params.id)
        .del()
        .then((data) => {
            console.log(data);
            res.send({ delete: 'data deleted successfully!!!' })
        })
        .catch((er) => {
            console.log(er);
        })
}

//to move in cart will create cart table first..
exports.moveToCart = async (req, res) => {
    knex.schema.createTable('cart', function (table) {
        table.increments('item_id').primary();
        table.string('cart_id');
        table.integer('product_id');
        table.string('attributes');
        table.integer('quantity');
        table.integer('buy_now');
        table.datetime('added_on');
    }).then(() => {
        console.log("cart table created successfully....")
    }).catch(() => {
        console.log("cart table is already exists!");
    })
    knex
        .select('*')
        .from('later')
        .where('item_id', req.params.id)
        .then((data) => {
            // console.log(data);
            if (data.length > 0) {
                knex('cart')
                    .insert(data[0])
                    .then((result) => {
                        knex
                            .select('*')
                            .from('later')
                            .where('item_id', req.params.id)
                            .delete()
                            .then((done) => {
                                res.send({ "Good": "data move from shopping_cart to cart successfully!" })
                            })
                    }).catch((err) => {
                        console.log(err);
                    })

            } else {
                res.send({ "Error": "this id is not available in shopping_cart" })
            }

        }).catch((err) => {
            console.log(err);
        })
}


exports.total_Amount = async (req, res) => {
    knex.select(
        'price',
        'quantity')
        .from('shopping_cart')
        .join('product', function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        })
        .where('shopping_cart.cart_id', cart_id)
        .then((data) => {
            // console.log(data);
            for (let i of data) {
                let result = [];
                let total_Amount = i.quantity * i.price;
                i.total_Amount = total_Amount;
                // console.log(i);
                result.push(i);
                res.send(result);
            }
        }).catch((err) => {
            console.log(err);
        })
}



exports.saveForLater = async (req, res) => {
    knex.schema.createTable('later', function(table){
        table.increments('item_id').primary();
        table.string('cart_id');
        table.integer('product_id');
        table.string('attributes');
        table.integer('quantity');
        table.integer('buy_now');
        table.datetime('added_on');
    }).then(() =>{
        console.log("later table created successfully....!")
    }).catch((err) =>{
        console.log("later table is already exists")
    })
    knex
    .select('*')
    .from('shopping_cart')
    .where('item_id', req.params.id)
    .then((data) =>{
        // console.log(data);
        if (data.length>0){
            knex('later')
            .insert(data[0])
            .then((result) =>{
                knex
                .select('*')
                .from('shopping_cart')
                .where('item_id', req.params.id)
                .then((done) =>{
                    res.send({"Good": "data move from shopping_cart to later successfully!"})
                })
            }).catch((err) =>{
                console.log(err);
            })
        }else{
            res.send({"Error": "sorry! this item_id is not available in this table."})
        }
    })
}

exports.getSaved = async (req, res) => {
knex
.select(
    'item_id',
    'product.name',
    'shopping_cart.attributes',
    'product.price'
)
.from('shopping_cart')
.join('product', function(){
    this.on('shopping_cart.product_id', 'product.product_id')
})
.where('shopping_cart.cart_id', req.params.id)
.then((data) =>{
    res.send(data);
}).catch((err) =>{
    console.log(err);
})
}

exports.removedProductbyId = async (req, res) => {
    knex.select("*")
    .from('shopping_cart')
    .delete()
    .where('shopping_cart.cart_id', req.params.id)
    .then((data) =>{
        console.log("data delete successfully!")
        res.send("data delete successfully!")
        console.log(data);
    }).catch((err) =>{
        console.log(err);
    })
}