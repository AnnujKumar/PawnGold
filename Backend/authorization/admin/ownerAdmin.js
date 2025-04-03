function checkOwnerAdminRole(req, res, next) {
    const user = req.user;
    if (user && user.role === 'owner') {
        return next(); 
    }
    return res.status(403).json({ message: 'Access denied: User is not an owner admin.' });
}

module.exports = checkOwnerAdminRole;
