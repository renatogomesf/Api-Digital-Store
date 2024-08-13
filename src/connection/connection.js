import { Sequelize } from "sequelize";

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    port: "3306",
    username: "root",
    password: "123456789",
    database: "digital-store"
})

export default connection