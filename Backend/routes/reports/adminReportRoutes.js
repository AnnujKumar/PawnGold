const express = require('express');
const router = express.Router();
const {isAuthorised} = require("../../authorization/authUser")
const checkRoles = (req,res,next)=>{
    const roles = ["super_admin"]
    if(roles.includes(req.user.role)){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"})
    }
}
const {getReports} = require("../../controllers/reports/adminReportsController");
router.get("/get-admin-reports", isAuthorised,checkRoles,getReports);
module.exports = router;