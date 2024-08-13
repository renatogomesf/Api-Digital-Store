import connection from "./connection.js";

import "../models/UserModel.js";
import "../models/CategoryModel.js";
import "../models/ProductModel.js";
import "../models/ImageProductModel.js";
import "../models/OptionProductModel.js";
import "../models/ProductCategoryModel.js";

connection.sync({alter:true})