import express from "express";
import ProductController from "../controllers/ProductController.js";

const ProductRoutes = express.Router()


ProductRoutes.get('/v1/product/search', ProductController.findAll)

ProductRoutes.get('/v1/product/:id', ProductController.findById)

ProductRoutes.post('/v1/product', ProductController.create)

ProductRoutes.put('/v1/product/:id', ProductController.update)

ProductRoutes.delete('/v1/product/:id', ProductController.delete)


export default ProductRoutes