var express = require("express");
var router = express.Router();

const client = require("../controllers/client");
const middleware = require("../middleware");

router.get("/", function (req, res, next) {
    client.getClients((clients) => {
        res.send(clients);
    });
});

router.post("/", function (req, res, next) {
    const newClient = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    };
    client.addClient(newClient, (client) => {
        res.send(client);
    });
});

router.get("/:username", function (req, res, next) {
    client.getClient(req.params.username, (client) => {
        res.send(client);
    });
});

module.exports = router;
