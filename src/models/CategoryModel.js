import { DataTypes, Model } from "sequelize";
import connection from "../services/connection.js";

class Categoria extends Model {}

Categoria.init(
    {
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },

        slug: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        use_in_menu: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0
        }
    },
    {
        tableName: "category",
        timestamps: true,
        sequelize: connection
    }
)

export default Categoria
