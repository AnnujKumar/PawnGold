const branchModel = require("../../models/branchModel");
const branchValidationSchema = require("../../validation/branchValidation/branchValidation");
const adminModel = require("../../models/adminModel")

const createBranch = async(req,res)=>{
    try{
        const {error} = branchValidationSchema.validate(req.body);
        if(error) return res.status(400).json({message:error.details[0].message});
        const {owner,branchHead,name,location} = req.body;
        const isOwnerValid = await adminModel.findOne({email:owner,role:"owner"});
        if(!isOwnerValid)return res.status(401).json({message:"Owner not found"});
        const isBranchHeadValid = await adminModel.findOne({email:branchHead,role:"branch_head"});
        if(!isBranchHeadValid)return res.status(401).json({message:"Branch head not found"});
        const branch = new branchModel({name:name,location:location,owner:isOwnerValid,branchHead:isBranchHeadValid});
        await branch.save();
        res.status(200).json({branch:branch});
    }catch(err){
        res.status(400).json({message:err});
    }   
}

const modifyBranch = async(req,res)=>{
    try{
        const {error} = branchValidationSchema.validate(req.body);
        if(error) return res.status(400).json({message:error.details[0].message});
        const {owner,branchHead,name,location} = req.body;
        const isOwnerValid = await adminModel.findOne({email:owner,role:"owner"});
        if(!isOwnerValid)return res.status(401).json({message:"Owner not found"});
        const isBranchHeadValid = await adminModel.findOne({email:branchHead,role:"branch_head"});
        if(!isBranchHeadValid)return res.status(401).json({message:"Branch head not found"});
        const branch = await branchModel.findOneAndUpdate({name:name},{location:location,owner:isOwnerValid,branchHead:isBranchHeadValid},{new:true});
        res.status(200).json({branch:branch});
    }catch(err){
        res.status(400).json({message:err});
    }   
}

const deleteBranch = async(req,res)=>{  
    try{
        const {name} = req.body;
        const branch = await branchModel.findOneAndDelete({name:name});
        res.status(200).json({message:"Branch Deleted Successfully"});
    }catch(err){
        res.status(400).json({message:err});
    }   
}   

module.exports.deleteBranch = deleteBranch
module.exports.modifyBranch = modifyBranch
module.exports.createBranch = createBranch; 