const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Role extends Model {}

Role.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: "Role",
    }
);

Role.create({ name: "admin" });
Role.create({ name: "moderator" });
Role.create({ name: "user" });

Role.sync();

module.exports = Role;
