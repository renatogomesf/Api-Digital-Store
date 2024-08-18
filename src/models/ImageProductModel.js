import { DataTypes, Model } from "sequelize";
import connection from '../services/connection.js';
import ProductModel from "./ProductModel.js";

class Imagens extends Model {}

Imagens.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: ProductModel,
                key: "id"
            },
            onDelete: 'CASCADE'
        },

        enable: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0
        },

        path: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: "image-product",
        timestamps: false,
        sequelize: connection
    }
)

export default Imagens
