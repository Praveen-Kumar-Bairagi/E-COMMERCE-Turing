const knex = require('../database/turingdb')

exports.gettax = async (req, res) => {
    await knex.select('*')
        .from('tax')
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}


exports.gettaxById = async (req, res) => {
    await knex.select("*")
        .from('tax')
        .where("tax_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}