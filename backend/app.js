const express =require('express')
const app =  express();
const errorMiddleware = require("./middleware/error")
const cookieParser  = require("cookie-parser")

app.use(express.json());
app.use(cookieParser())
 
app.use('/api/v1', require('./routes/productsRoutes'))
app.use('/api/v2', require('./routes/userRoutes'))
app.use('/api/v3', require('./routes/orderRoutes'))
//Middleware for error

app.use(errorMiddleware)

module.exports = app