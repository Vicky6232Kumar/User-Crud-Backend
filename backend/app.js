const express =require('express')
const app =  express();
const errorMiddleware = require("./middleware/error")
const cookieParser  = require("cookie-parser")
const bodyParser  = require("body-parser")
const fileUpload = require("express-fileupload")

const dotenv = require('dotenv')
dotenv.config({path:"backend/config/config.env"})

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())
 
app.use('/api/v1', require('./routes/productsRoutes'))
app.use('/api/v2', require('./routes/userRoutes'))
app.use('/api/v3', require('./routes/orderRoutes'))
app.use('/api/v4', require('./routes/paymentRoutes'))


//Middleware for error

app.use(errorMiddleware)

module.exports = app