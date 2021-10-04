const router=require('express').Router()
const {getdepartment,getdepartmentByID}=require('../controllers/departments')

router.get('/departments',getdepartment)

router.get('/departments/:id',getdepartmentByID)



module.exports=router;