import express from 'express';
import UserController from '../controllers/UserController.js';

const UserRoutes = express.Router()


UserRoutes.get('/user', UserController.findAll)

UserRoutes.get('/user/:id', UserController.findById)

UserRoutes.post('/user', UserController.create)

UserRoutes.put('/user/:id', UserController.update)

UserRoutes.delete('/user/:id', UserController.delete)


export default UserRoutes
