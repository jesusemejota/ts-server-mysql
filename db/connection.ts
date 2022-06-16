import { Sequelize } from "sequelize";

const db = new Sequelize('node', 'root', '1289', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;