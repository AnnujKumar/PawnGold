const express = require("express");
const router = express.Router();
const { isAuthorised } = require("../../authorization/authUser");
const { createLoan, approveLoan, rejectLoan } = require("../../controllers/loan/loanController");

const checkRoles = (req, res, next) => {
  const roles = ["owner", "super_admin", "branch_head", "staff"];
  console.log(req.user.role);
  if (roles.includes(req.user.role)) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

router.post("/create-loan", createLoan);
router.post("/approve-loan", isAuthorised, checkRoles, approveLoan);
router.post("/reject-loan", isAuthorised, checkRoles, rejectLoan);

module.exports = router;