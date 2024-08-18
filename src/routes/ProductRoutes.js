import express from "express";
import ProductController from "../controllers/ProductController.js";
import ProductMiddleware from "../middleware/ProductMiddleware.js";

const ProductRoutes = express.Router()


ProductRoutes.get('/v1/product/search', ProductMiddleware.verifyFindAll, ProductController.findAll)

ProductRoutes.get('/v1/product/:id', ProductController.findById)

ProductRoutes.post('/v1/product', ProductMiddleware.verifyCreate, ProductController.create)

ProductRoutes.put('/v1/product/:id', ProductController.update)

ProductRoutes.delete('/v1/product/:id', ProductController.delete)


export default ProductRoutes
