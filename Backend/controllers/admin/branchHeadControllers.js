const {branchHeadRegisterValidation, branchHeadLoginValidation} = require('../../validation/adminValidation/branchHeadValidation');
const Admin = require('../../models/adminModel');
const jwt = require("jsonwebtoken")
const registerBranchHead = async (req, res) => {
    try {
      const { error } = branchHeadRegisterValidation.validateAsync(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const admin = new Admin(req.body);
      await admin.save();
      const token = await admin.generateAuthToken();
      res.cookie("token", token);
      res.status(201).send({ admin, token });
    } catch (err) {
      res.status(400).json({err});
    }
  }
const loginBranchHead = async (req, res) => {
    try {
      const { error } = branchHeadLoginValidation.validateAsync(req.body);
      if (error) {    
        return res.status(400).json({ error: error.details[0].message }); 
      }
      const { email, password } = req.body;
      const admin = await Admin.findOne({email:email});

      if (!admin) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      const isMatch = await admin.comparePassword(password);
      if(!isMatch){
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      const token = await admin.generateAuthToken();
      res.cookie("token", token);
      console.log(token)
      res.status(200).json({ admin, token });
    } catch (err) {
      res.status(400).json({err});
    }
  }

const logoutBranchHead = async (req, res) => {
   
    try {
      const token = req.cookies.token || req.headers.authorization.split(" ")[1];
      if(!token){
        return res.status(401).json({error:"You are not logged in"});
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(verified._id);
      if(!admin){
        return res.status(401).json({error:"You are not logged in"});
      }
      res.clearCookie("token");
      res.status(200).json({message:"Logged out successfully"});
    } catch (err) {
      console.log(err)
      res.status(400).json({err:err});
    }
  }
module.exports.loginBranchHead = loginBranchHead;
module.exports.registerBranchHead = registerBranchHead;   
module.exports.logoutBranchHead = logoutBranchHead;
