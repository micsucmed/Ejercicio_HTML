var express = require("express");
var router = express.Router();

let jwt = require("jsonwebtoken");
let config = require("../config");
var CryptoJS = require("crypto-js");
const client = require("../controllers/client");

/* GET users listing. */
router.post("/", function (req, res, next) {
    let username = req.body.username;
    let password = CryptoJS.MD5(req.body.password).toString();

    const user = {};

    client.getClient(username, (client) => {
        user.username = client.username;
        user.hashedPassword = client.hashedPassword;
        if (username && password) {
            if (
                username === user.username &&
                password === user.hashedPassword
            ) {
                let token = jwt.sign({ username: username }, config.secret, {
                    expiresIn: "24h",
                });
                res.send({
                    success: true,
                    message: "Authentication successful",
                    token: token,
                });
            } else {
                res.send({
                    success: false,
                    message: "Username or password not valid",
                });
            }
        } else {
            res.send({
                success: false,
                message: "Username or password not provided",
            });
        }
    });
});

module.exports = router;
