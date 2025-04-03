const express = require('express');
const {createTransaction} = require("../../controllers/transactions/transactionsController")
const {isAuthorised} = require("../../authorization/authUser")
const router = express.Router();
const checkRoles = (req,res,next)=>{
    const roles = ["owner","super_admin","branch_head","staff"]
    if(roles.includes(req.user.role)){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized"})
    }
}
router.post("/create-transaction",isAuthorised,checkRoles,createTransaction)

module.exports = router;