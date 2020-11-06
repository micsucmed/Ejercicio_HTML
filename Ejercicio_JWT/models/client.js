const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");
const Role = require("./role");

class Client extends Model {}

Client.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashedPassword: {
            type: DataTypes.STRING(64),
            allowNull: false,
            is: /^[0-9a-f]{64}$/i,
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Client",
    }
);

Client.hasOne(Role, { foreignKey: "roleId" });

Client.sync();

module.exports = Client;
