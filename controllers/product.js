const knex = require('../database/turingdb')

exports.getProducts = async (req, res) => {
    await knex.select("*")
        .from('product')

        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })

}


exports.getproductBySearch = async (req, res) => {
    var search = req.query.search;
    // console.log(search);
    await knex.select(
        'product_id',
        'name',
        'description',
        'price',
        'discounted_price',
        'thumbnail')
        .from('product')
        .where('name', 'like', `%${search}%`)
        .orWhere('description', 'like', `%${search}%`)
        .orWhere('product_id', 'like', `%${search}%`)
        .orWhere('price', 'like', `%${search}%`)
        .orWhere('discounted_price', 'like', `%${search}%`)

        .then((data) => {
            // console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })

}

exports.getproductById = async (req, res) => {
    exports.getproductById = async (req, res) => {
        await knex.select("*")
            .from('product')
            .where("product_id", req.params.id)
            .then((data) => {
                console.log(data);
                res.send(data)
            })
            .catch((er) => {
                console.log(er);
            })
    }
    await knex.select("*")
        .from('product')
        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getproductByCategory = async (req, res) => {
    await knex.select(
        'product.product_id',
        'product.name',
        'product.description',
        'product.price',
        'product.discounted_price',
        'product.thumbnail'
    )
        .from('product')
        .join('product_category', function () {
            this.on('product.product_id', 'product_category.product_id')
        })

        .where("category_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}


exports.getproductBydepartment = async (req, res) => {
    await knex.select(
        'product.product_id',
        'product.name',
        'product.description',
        'product.price',
        'product.discounted_price',
        'product.thumbnail'
    )
        .from('product')
        .join('product_category', function () {
            this.on('product.product_id', 'product_category.product_id')
        })
        .join('category', function () {
            this.on('product_category.category_id', 'category.category_id')
        })
        .join('department', function () {
            this.on('category.department_id', 'department.department_id')
        })
        .where("department.department_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}


exports.getproductsDetails = async (req, res) => {
    await knex.select(
        'product_id',
        'name',
        'description',
        'price',
        'discounted_price',
        'image',
        'image_2')
        .from('product')
        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getproductLocations = async (req, res) => {
    await knex.select(
        "category.category_id",
        "category.name as category_name",
        'department.department_id',
        'department.name as department_name',

    )
        .from('category')
        .join('department', function () {
            this.on('category.category_id', 'department.department_id')
        })
        // .join('product', function () {
        //     this.on('category.department_id', 'product.product_id')
        // })
        .where("category_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}



exports.getproductReviewById = async (req, res) => {
    await knex.select("*")
        .from('review')
        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}


exports.createPostReviews = async (req, res) => {
    await knex.select("*")
        .from('customer')
        // .where("product_id", req.params.id)
        .then(() => {
            knex("review").insert({
                customer_id: 1,
                product_id: req.body.product_id,
                review: req.body.review,
                rating: req.body.rating,
                created_on: new Date()
            })
                .then((data) => {
                    console.log(data);
                    res.send(data)
                })
                .catch((er) => {
                    console.log(er);
                })
        })
        .catch((er) => {
            console.log(er);
        })
}

