const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    useNullAsDefault: true
});


// knex.schema.createTable("orders", (table) => {
//     // table.increments('id').primary();
//     table.string('cart_id').notNullable()
//     // table.string('Shipping_id').notNullable()
//     // table.string('tax_id').notNullable( )

  
// })
//     .then((data) => {
//         console.log("Table Created");
//     })
//     .catch((err) => {
//         console.log("Table Already Exist!!");
//     })

module.exports = knex;