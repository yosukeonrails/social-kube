require('dotenv').config();
exports.URL= process.env.URL ||'http://localhost:8080/';
exports.DATABASE_URL = process.env.DATABASE_URL 
exports.PORT = process.env.PORT || 8080;
