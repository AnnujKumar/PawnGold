function checkStaffRole(req, res, next) {
    const user = req.user;
    if (user && user.role === 'staff') {
        return next(); 
    }
    return res.status(403).json({ message: 'Access denied: User is not a staff member.' });
}

module.exports = checkStaffRole;
