const router=require('express').Router()
const {getProducts,getproductBySearch,getproductById,getproductByCategory,getproductBydepartment,getproductsDetails,getproductLocations,getproductReviewById,createPostReviews}=require('../controllers/product')
const {authenticateToken}=require('../Auth/jwt')
router.get('/products/',getProducts)
router.get('/products/search',getproductBySearch)
router.get('/products/:id',getproductById)
router.get('/products/inCategory/:id',getproductByCategory)
router.get('/products/inDepartment/:id',getproductBydepartment)
router.get('/products/:id/details',getproductsDetails)
router.get('/products/:id/locations',getproductLocations)
router.get('/products/:id/reviews',getproductReviewById)

router.post('/products/:id/reviews',authenticateToken,createPostReviews)


module.exports=router;  