const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const DB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

module.exports=DB