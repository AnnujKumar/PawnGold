const {ownerAdminRegisterValidation, ownerAdminLoginValidation} = require('../../validation/adminValidation/ownerAdminValidation');
const Admin = require('../../models/adminModel');
const jwt = require("jsonwebtoken")
const registerOwnerAdmin = async (req, res) => {
    try {
      const { error } = ownerAdminRegisterValidation.validateAsync(req.body);
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
const loginOwnerAdmin = async (req, res) => {
    try {
      const { error } = ownerAdminLoginValidation.validateAsync(req.body);
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

const logoutOwnerAdmin = async (req, res) => {
   
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
module.exports.loginOwnerAdmin = loginOwnerAdmin;
module.exports.registerOwnerAdmin = registerOwnerAdmin;   
module.exports.logoutOwnerAdmin = logoutOwnerAdmin;
