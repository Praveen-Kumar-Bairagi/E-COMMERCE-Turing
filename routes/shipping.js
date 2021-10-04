const router=require('express').Router()

const {shippingReg,shippingRegById}=require('../controllers/shipping')

router.get('/shipping/regions',shippingReg)

router.get('/shipping/regions/:id',shippingRegById)



module.exports=router;