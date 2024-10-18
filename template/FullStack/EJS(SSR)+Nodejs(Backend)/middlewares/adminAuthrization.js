const adminAuth = (req, res, next) => {
    // Assume req.user contains the authenticated user's info, including their role
    // console.log(req.user[0].role)
    if (req.user && req.user[0].role === 'admin') {
        // If the user is an admin, allow access
        next();
    } else {
        // If not an admin, deny access
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};

export default adminAuth;
