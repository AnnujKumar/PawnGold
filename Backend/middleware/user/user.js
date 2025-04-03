const jwt = require("jsonwebtoken");
const Admin = require("../../models/customerModel");
const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "You are not logged in" });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(verified._id);
        if (!admin) {
            return res.status(401).json({ error: "You are not logged in" });
        }
        req.user = admin;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err });
    }
}
module.exports = authUser;
