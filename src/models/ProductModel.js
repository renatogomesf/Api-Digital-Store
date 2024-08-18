import { DataTypes, Model } from "sequelize";
import connection from '../services/connection.js';


class ProductModel extends Model {
    static associate({CategoryModel, ProductCategoryModel, ImageProductModel, OptionProductModel}){
        
        ProductModel.hasMany(ImageProductModel, {
            foreignKey: "product_id"
        })
        
        ProductModel.hasMany(OptionProductModel, {
            foreignKey: "product_id"
        })
        
        ProductModel.belongsToMany(CategoryModel, {
            through: ProductCategoryModel,
            foreignKey: "product_id",
            otherKey: "category_id"
        })
    }
}

ProductModel.init(
    {
        enable: {
            type: DataTypes.TINYINT(1),
            defaultValue: 0
        },

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
        },

        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        description: {
            type: DataTypes.STRING(255)
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        tableName: "product",
        timestamps: true,
        sequelize: connection
    }
)

export default ProductModel
