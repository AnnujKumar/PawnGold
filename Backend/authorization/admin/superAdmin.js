
function checkSuperAdminRole(req, res, next) {
    const user = req.user;
    if (user && user.role === 'super_admin') {
        return next(); 
    }
    return res.status(403).json({ message: 'Access denied: User is not a super admin.' });
}

module.exports = checkSuperAdminRole;