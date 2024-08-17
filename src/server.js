import express from "express";
import dotenv from "dotenv"

import PublicRoutes from "./routes/PublicRoutes.js";

import UserRoutes from './routes/UserRoutes.js';
import CategoryRoutes from "./routes/CategoryRoutes.js";

dotenv.config()
const app = express()
app.use(express.json())
app.use(PublicRoutes)

app.use(UserRoutes)
app.use(CategoryRoutes)
// app.use(PrivateRoutes)

const PORT = process.env.PORT_API
const LOCALHOST = 'localhost'

app.listen(PORT, LOCALHOST, ()=>{
    console.log(`Sevidor rodando. http://${LOCALHOST}:${PORT}`);
})