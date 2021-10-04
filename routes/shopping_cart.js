const router=require('express').Router()
const {genrateUniqId,addProductToCart,getShoppingCartById,updateCart,emptyCart,moveToCart,total_Amount,saveForLater,getSaved,removedProductbyId}=require('../controllers/shopping_cart')


router.get('/shoppingcart/genrateUniqueId',genrateUniqId)
router.get('/shoppingcart/:id',getShoppingCartById)
router.get('/shoppingcart/moveToCart/:id',moveToCart)
router.get('/shoppingcart/totalAmount/:id',total_Amount)
router.get('/shoppingcart/saveForLater/:id',saveForLater)
router.get('/shoppingcart/getSaved/:id',getSaved)

router.delete('/shoppingcart/removeProduct/:id',removedProductbyId)
router.delete('/shoppingcart/empty/:id',emptyCart)

//add products
router.post('/shoppingcart/add',addProductToCart)

//update cart
router.put('/shoppingcart/update/:id',updateCart)


module.exports=router;