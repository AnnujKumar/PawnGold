const express = require('express');
const router = express.Router();
const {registerBranchHead, loginBranchHead, logoutBranchHead} = require('../../controllers/admin/branchHeadControllers');
const authBranchHead = require('../../middleware/admin/branchHead');
const {isAuthorised} = require("../../authorization/authUser")
const checkRoles = (req,res,next)=>{
    const roles = ["owner","super_admin","branch_head"]
    if(req.roles.includes(req.user.role)){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"})
    }
}
router.post('/register', registerBranchHead);
router.post("/login", loginBranchHead);
router.post("/logout", isAuthorised, checkRoles, logoutBranchHead);
module.exports = router;
