import { DataTypes, Model } from "sequelize";
import connection from '../services/connection.js';

class UserModel extends Model {}

UserModel.init(
    {
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        surname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    },
    {
        tableName: "users",
        timestamps: true,
        sequelize: connection
    }
)

export default UserModel
