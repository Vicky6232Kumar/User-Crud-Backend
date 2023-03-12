const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const jwt = require('jsonwebtoken')
const User = require('../database/models/userModel')

exports.isAuthenenticatedUser = catchAsyncError(async(req,res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler(401, "Please Login to access resources"))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRECT)
    req.user =  await User.findById(decodedData.id);
    next()
})

exports.authorizedRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(403, `Role: ${req.user.role} is not allowed to access this resources`))
        }
        next();
    }
}


