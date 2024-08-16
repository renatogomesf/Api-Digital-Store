import { Sequelize } from "sequelize";
import env from "dotenv"

env.config()

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    port: process.env.PORT_DB,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB
})

export default connection
