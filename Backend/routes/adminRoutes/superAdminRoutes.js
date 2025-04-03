const express = require('express');
const router = express.Router();
const {registerSuperAdmin,loginSuperAdmin,getLoanTransactions,logoutSuperAdmin,getLoanDetails,getCustomerDetails,getSuperAdminData,getCustomerList} = require('../../controllers/admin/superAdminControllers');
const authSuperAdmin = require('../../middleware/admin/superAdmin');
const checkSuperAdminRole = require('../../authorization/admin/superAdmin');
const { isAuthorised } = require('../../authorization/authUser');
const checkRoles = (req,res,next)=>{
    const roles = ["super_admin"]
    if(roles.includes(req.user.role)){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"})
    }
}
router.get("/getLoanTransactions",getLoanTransactions)
router.get("/getSuperAdminData",getSuperAdminData);
router.get("/getLoanDetails",getLoanDetails);
router.get("/getCustomerDetails",getCustomerDetails);
router.get("/getCustomerList",getCustomerList);
router.post('/register',registerSuperAdmin);
router.post("/login",loginSuperAdmin);
router.post("/logout",isAuthorised,checkRoles,logoutSuperAdmin);
module.exports = router;