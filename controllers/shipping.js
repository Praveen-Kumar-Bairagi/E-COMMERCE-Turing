const knex=require('../database/turingdb')

exports.shippingReg=async (req, res) => {
    await knex.select('*')
        .from('shipping_region')
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.shippingRegById=async (req, res) => {
    await knex.select('*')
        .from('shipping')
        .where('shipping_region_id',req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}
