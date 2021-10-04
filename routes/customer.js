const router=require('express').Router()
const {getCustomerId,customerSign,customerLog,updateCustomer,updateCustomerAddress,updateCustomerCreditinfo}=require('../controllers/customer')
const {authenticateToken}=require('../Auth/jwt')
//get customer by ID
router.get('/customer/:id',authenticateToken    ,getCustomerId)

//create account of customer 
router.post('/customers',customerSign)
router.post('/customers/login',customerLog)
router.post('/customers/facebook')//will do later


//update customer
router.put('/customer',authenticateToken,updateCustomer)   
router.put('/customers/address',authenticateToken,updateCustomerAddress)
router.put('/customers/creditCard',authenticateToken,updateCustomerCreditinfo)





module.exports=router;