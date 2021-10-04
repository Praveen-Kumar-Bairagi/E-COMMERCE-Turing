const router=require('express').Router()
const {gettax,gettaxById}=require('../controllers/tax')

router.get('/tax',gettax)

router.get('/tax/:id',gettaxById)



module.exports=router;