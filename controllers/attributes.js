
const knex = require('../database/turingdb')

exports.getAttributes = async (req, res) => {

    await knex.select('*')
        .from('attribute')
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getAttributesById = async (req, res) => {
    await knex.select("*")
        .from('attribute')
        .where("attribute_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getAttributesValueById = async (req, res) => {
    await knex.select("attribute_value_id", "value")
        .from("attribute_value")
        .where("attribute_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })

}

exports.getAttributesByProductId = async (req, res) => {

    await knex.select("*")
        .from('attribute')
        .join('attribute_value', function () {
            this.on('attribute.attribute_id', 'attribute_value.attribute_id')
        })
        .join('product_attribute', function () {
            this.on('attribute_value.attribute_id', 'product_attribute.attribute_value_id')
        })

        .where("product_attribute.product_id", req.params.id)
        .then((data) => {
            // console.log(data)   
            // res.send(data)
            var data_list = [];
            for (var i of data){
                var Dict = {
                    'attribute_name' : i.name,
                    'attribute_value_id' : i.attribute_value_id,
                    'attribute_value' : i.value
                }
                data_list.push(Dict); 
            }
            res.send(data_list)
        })
        .catch((er) => {
            console.log(er);
        })

}