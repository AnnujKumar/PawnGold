function checkBranchHeadRole(req, res, next) {
    const user = req.user;
    if (user && user.role === 'branch_head') {
        return next(); 
    }
    return res.status(403).json({ message: 'Access denied: User is not a branch head.' });
}

module.exports = checkBranchHeadRole;
