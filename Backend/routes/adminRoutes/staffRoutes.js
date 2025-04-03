const express = require('express');
const router = express.Router();
const {registerStaff, loginStaff, logoutStaff} = require('../../controllers/admin/staffControllers');
const authStaff = require('../../middleware/admin/staff');
const {isAuthorised} = require("../../authorization/authUser")
const checkRoles = (req,res,next)=>{
    const roles = ["owner","super_admin","branch_head","staff"]
    if(roles.includes(req.user.role)){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"})
    }
}
router.post('/register', registerStaff);
router.post("/login", loginStaff);
router.post("/logout", isAuthorised, checkRoles, logoutStaff);
module.exports = router;
