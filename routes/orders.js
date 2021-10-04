const router=require('express').Router()
const {getOrdersById,createOrders,getOrdersbyCustomer,getshortdetailsOrdersbyId}=require('../controllers/orders')
const{authenticateToken} = require('../Auth/jwt')

//create order      
router.post('/orders',authenticateToken,createOrders)

router.get('/orders/:id',authenticateToken,getOrdersById) 
router.get('/orders/inCustomers/',authenticateToken,getOrdersbyCustomer)
router.get('/orders/shortDetails/:id',authenticateToken,getshortdetailsOrdersbyId)


module.exports=router;  