const express = require('express');
const router = express.Router();
const {isAuthorised} = require("../../authorization/authUser")
const {registerOwnerAdmin, loginOwnerAdmin, logoutOwnerAdmin} = require('../../controllers/admin/ownerAdminControllers');
const authOwnerAdmin = require('../../middleware/admin/ownerAdmin');
const checkOwnerAdminRole = require('../../authorization/admin/ownerAdmin');
const checkRoles = (req,res,next)=>{
    const roles = ["owner","super_admin"]
    if(req.user.role in roles){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"})
    }
}
router.post('/register', registerOwnerAdmin);
router.post("/login", loginOwnerAdmin);
router.post("/logout", isAuthorised,checkRoles,logoutOwnerAdmin);
module.exports = router;
