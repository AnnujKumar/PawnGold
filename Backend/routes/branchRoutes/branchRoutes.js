
const {createBranch,modifyBranch,deleteBranch} = require("../../controllers/branch/branchControllers");
const express = require("express");
const authSuperAdmin = require("../../middleware/admin/superAdmin");
const router = express.Router();
const {isAuthorised} = require("../../authorization/authUser")
const checkRoles = (req,res,next)=>{
    const roles = ["owner","super_admin"]
    if(roles.includes(req.user.role)){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"})
    }
}
router.post("/create-branch",isAuthorised,checkRoles,createBranch)
router.post("/modify-branch",isAuthorised,checkRoles,modifyBranch)
router.get("/delete-branch",isAuthorised,checkRoles,deleteBranch)



module.exports = router;