// Import Depandencies...
const jwt = require("jsonwebtoken");

// Import local depandencies


// Middleware for Protecting routes...
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // Check JWT exist or not...
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, docodeToken) => {
            if(err) {
                console.log(err.message);
                res.json({
                    msg: "You are no authenticated. Please consider signup or login first."
                })
            } else {
                console.log(docodeToken);
                next();
            }
        });
    } else {
        res.json({
            msg: "You are no authenticated. Please consider signup or login first."
        })
    }
}

module.exports = { requireAuth };