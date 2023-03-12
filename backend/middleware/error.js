const ErrorHandler = require('../utils/errorhandler');


module.exports = (err, req, res ,next) => {
    err.statusCode = err.statusCode || 500,
    err.message = err.message || "Internal server error"

    // Mongodb id error

    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(400 , message)
    }

    // Mongoose duplicate key error

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(400 , message)
    }

    // Wrong JWT Token

    if(err.name === "JsonWenTokenError"){
        const message = "Json web token is invalid, Try again"
        err = new ErrorHandler(400 , message)
    }

    //JWT Expire error

    if(err.name === "TokenExpiredError"){
        const message = "Json web token is expired, Try again"
        err = new ErrorHandler(400 , message)
    }
    
    res.status(err.statusCode).json({
        success:false,
        message : err.message 

    })
}