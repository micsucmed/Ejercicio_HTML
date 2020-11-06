const Client = require("../models/client");
const Role = require("../models/role");
var CryptoJS = require("crypto-js");

const getClients = (callback) => {
    Client.findAll().then((result) => {
        callback(result);
    });
};

const getClient = (username, callback) => {
    Client.findOne({ where: { username: username } }).then((result) => {
        callback(result);
    });
};

const addClient = (client, callback) => {
    const hashedPwd = CryptoJS.MD5(client.password).toString();
    let roleId = -1;
    if (client.role === "admin") {
        roleId = 1;
    } else if (client.role === "moderator") {
        roleId = 2;
    } else if (client.role === "user") {
        roleId = 3;
    } else {
        callback("That is not a vaild role.");
    }
    Client.create({
        username: client.username,
        hashedPassword: hashedPwd,
        roleId: roleId,
    }).then((response) => {
        callback(response);
    });
};

const client = { getClients, getClient, addClient };

module.exports = client;
