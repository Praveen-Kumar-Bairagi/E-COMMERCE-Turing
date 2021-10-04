const router=require('express').Router()
const { getAttributes ,getAttributesById,getAttributesValueById,getAttributesByProductId} = require('../controllers/attributes')

router.get('/attributes',getAttributes)
router.get('/attributes/:id',getAttributesById)
router.get('/attributes/values/:id',getAttributesValueById)
router.get('/attributes/inProduct/:id',getAttributesByProductId)




module.exports=router;