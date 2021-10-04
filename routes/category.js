const router=require('express').Router()
const {getcategories,getcategoriesbyId,productId,getdepartmentId}=require('../controllers/category')

router.get('/categories',getcategories)
router.get('/categories/:id',getcategoriesbyId)

router.get('/categories/inProduct/:id',productId)
router.get('/categories/inDepartment/:id',getdepartmentId)


module.exports=router;  