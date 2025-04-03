function checkUserRole(req, res, next) {
    const user = req.user;
    if (user && user.role === 'user') {
        return next(); 
    }
    return res.status(403).json({ message: 'Access denied: User is not a user.' });
}

module.exports = checkUserRole;
