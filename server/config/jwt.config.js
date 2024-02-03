const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
module.exports.secret = secret;
//Middleware
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {// tener em cuenta que el userToken debe tener la T en mayusculas 
        console.log(payload);
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}