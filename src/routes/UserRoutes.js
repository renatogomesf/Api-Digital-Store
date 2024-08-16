import express from 'express';
import UserController from '../controllers/UserController.js';
import UserMiddleware from '../middleware/UserMiddleware.js';

const UserRoutes = express.Router()


UserRoutes.get('/v1/user', UserController.findAll)

UserRoutes.get('/v1/user/:id', UserController.findById)

UserRoutes.post('/v1/user', UserMiddleware.verifyCreate, UserController.create)

UserRoutes.put('/v1/user/:id', UserMiddleware.verifyUpdate, UserController.update)

UserRoutes.delete('/v1/user/:id', UserMiddleware.verifyDelete, UserController.delete)


export default UserRoutes
