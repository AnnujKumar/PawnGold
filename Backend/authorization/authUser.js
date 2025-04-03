const adminModel = require("../models/adminModel");
const customerModel = require("../models/customerModel")
const jwt = require("jsonwebtoken");
const isAuthorised = async(req,res,next)=>{
    try{
        const token = req.cookies.token||req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized to access this route"})
        }
        const person = jwt.verify(token,process.env.JWT_SECRET);
        if(!person){
            return res.status(401).json({message:"Unauthorized to access this route"})
        }
        let user;
        if(person.role==="user"){
            user = await customerModel.findById(person._id);
            if(!user){
                return res.status(401).json({message:"Unauthorized to access this route"})
            }
        }
        else{
            user = await adminModel.findById(person._id);
            if(!user){
                return res.status(401).json({message:"Unauthorized to access this route"})
            }
        }
        req.user = user;
        next()
}
catch(err){
    return res.status(500).json({message:err.message})
}
}
module.exports = {isAuthorised};