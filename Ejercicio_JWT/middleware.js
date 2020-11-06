let jwt = require("jsonwebtoken");
const config = require("./config.js");

const checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token) {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: "Token is not valid",
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } /*else {
            res.send({
                success: false,
                message: "Auth token is not supplied",
            });
        }*/
    } else {
        res.send({
            success: false,
            message: "Auth token is not supplied",
        });
    }
};

const isAdmin = (req, res, next) => {};

module.exports = {
    checkToken,
};
