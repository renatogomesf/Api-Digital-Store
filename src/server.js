import express from "express";
import env from "dotenv"

import PublicRoutes from "./routes/PublicRoutes.js";
import PrivateRoutes from "./routes/PrivateRoutes.js";

env.config()
const app = express()
app.use(express.json())
app.use(PublicRoutes)
app.use(PrivateRoutes)

const PORT = process.env.PORT_API
const LOCALHOST = 'localhost'

app.listen(PORT, LOCALHOST, ()=>{
    console.log(`Sevidor rodando. http://${LOCALHOST}:${PORT}`);
})