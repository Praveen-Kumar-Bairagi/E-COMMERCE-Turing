const knex = require('../database/turingdb')

exports.getdepartment = async (req, res) => {
    await knex.select('*')
        .from('department')
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })
}

exports.getdepartmentByID = async (req, res) => {
    await knex.select("*")
        .from('department')
        .where("department_id", req.params.id)
        .then((data) => {
            console.log(data);
            res.send(data)
        })
        .catch((er) => {
            console.log(er);
        })

}