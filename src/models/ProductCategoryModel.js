import { DataTypes, Model } from "sequelize";
import connection from '../services/connection.js';
import ProductModel from "./ProductModel.js";
import CategoryModel from "./CategoryModel.js";

class ProductCategoryModel extends Model {}

ProductCategoryModel.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProductModel,
                key: "id"
            }
        },

        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CategoryModel,
                key: "id"
            }
        }
    },
    {
        tableName: "product-category",
        timestamps: false,
        sequelize: connection
    }
)

export default ProductCategoryModel
