const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logoutUser} = require('../../controllers/user/userControllers');
const authUser = require('../../middleware/user/user');
const checkUserRole = require('../../authorization/user/user');
router.post('/register', registerUser);
router.post("/login", loginUser);
router.post("/logout", authUser, checkUserRole, logoutUser);
module.exports = router;
