require('dotenv').config();

exports.URL= process.env.URL ||'http://localhost:8080/';

exports.DATABASE_URL = process.env.DATABASE_URL 
// ||
//                        global.DATABASE_URL ||
//                        (process.env.NODE_ENV === 'production' ?
//                             'mongodb://localhost/fierce-service-app' :
//                             'mongodb://localhost/fierce-service-app-dev');

exports.PORT = process.env.PORT || 8080;
exports.AUTH0_CLIENT_ID= process.env.AUTH0_CLIENT_ID;
exports.AUTH0_CLIENT_SECRET= process.env.AUTH0_CLIENT_SECRET;
exports.AUTH0_DOMAIN= process.env.AUTH0_DOMAIN;
