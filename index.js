const express=require('express')
const app=express()
require('dotenv').config()
// const bodyparser=require('body-parser')

// require('./database/turingdb')  
app.use(express.json())
app.use('/',require('./routes/attributes'))
app.use('/',require('./routes/departments'))
app.use('/',require('./routes/tax'))
app.use('/',require('./routes/shipping'))
app.use('/',require('./routes/category'))
app.use('/',require('./routes/orders'))
app.use('/',require('./routes/product'))
app.use('/',require('./routes/customer'))
app.use('/',require('./routes/shopping_cart'))
app.use('/',require('./routes/stripe'))


const Port=process.env.PORT||2050
app.listen(Port,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${Port}`);
})