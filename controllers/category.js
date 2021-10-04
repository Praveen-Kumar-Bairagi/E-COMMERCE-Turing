
const knex = require('../database/turingdb')

exports.getcategories = async (req, res) => {
    await knex.select('*')
        .from('category')
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getcategoriesbyId = async (req, res) => {
    await knex.select("*")
        .from('category')
        .where("category_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}


exports.productId = async (req, res) => {
    await knex.select(
            "category.category_id",
            "department_id",
        "name")
        .from('category')
        .innerJoin('product_category', function(){
            this.on('category.category_id', 'product_category.category_id')
        })

        .where("product_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getdepartmentId = async (req, res) => {
    await knex.select(
            "category.category_id",
            "category.name",
            "category.description",
            "category.department_id")
        .from('category')

        .where("department_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}





