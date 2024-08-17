import express from 'express';

import CategoryController from '../controllers/CategoryController.js';
import CategoryMiddleware from '../middleware/CategoryMiddleware.js';

const CategoryRoutes = express.Router()


CategoryRoutes.get('/v1/category/search', CategoryMiddleware.verifyFindAll, CategoryController.findAll)

CategoryRoutes.get('/v1/category/:id', CategoryController.findById)

CategoryRoutes.post('/v1/category', CategoryMiddleware.verifyCreate, CategoryController.create)

CategoryRoutes.put('/v1/category/:id', CategoryMiddleware.verifyUpdate, CategoryController.update)

CategoryRoutes.delete('/v1/category/:id', CategoryMiddleware.verifyDelete, CategoryController.delete)


export default CategoryRoutes
