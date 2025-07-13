import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const dbms = process.env.DBMS;
const host = process.env.HOST;

const sequelize = new Sequelize(db_name, db_user, db_pass, {
    host: host,
    dialect: dbms
});

export default sequelize;