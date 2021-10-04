const router=require('express').Router()
const {}=require('../controllers/shipping')

router.post('/stripe/charge')

router.post('/stripe/webhooks')



module.exports=router;