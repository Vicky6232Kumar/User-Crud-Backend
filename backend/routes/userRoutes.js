const express = require('express');
const router = express.Router();
const User = require('../database/models/userModel')
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');
const sendToken =require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto')
const {isAuthenenticatedUser, authorizedRoles} = require('../middleware/auth')

// Router - 1 Create A user

router.post('/user/new', catchAsyncError( async (req,res)=>{

    const {name, email, password} = req.body;
    const user = await User.create({
        name, email, password,
        avatar:{
            public_id : "This is public is",
            url : "profilepicUrl"
        }
    })

    sendToken(user, 201, res)
}
))

// Router - 2 Login User
 
router.post("/login", catchAsyncError(async(req,res, next)=>{
    const { email , password } = req.body;
    if(!email || !password){
        return next(new ErrorHandler(400, "Please enter Email & password"))
    }

    const user = await User.findOne( {email} ).select("+password");
    if(!user){
        return next(new ErrorHandler(401, "Invalid email or password"))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler(401, "Invalid email or password"))
    }

    sendToken(user, 200, res)
}
))

// Router - 3 Logout User

router.get('/logout', catchAsyncError(async (req,res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success:true,
        message: "Logged out"
    })
}))

// Important notice - forgot password router and reset password router does not working right now sign we have to check for nodemailer . Since google does not allow to access the username ans password

// we does touch the router 4 and router 5

// Router 4 Forgot Password

router.post('/password/forgot', catchAsyncError( async(req,res,next)=>{
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return next(new ErrorHandler(404, "User not found"))
    }

    // Get ResetPasswordToken
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v2/password/forget/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it`

    try{
        await sendEmail({
            email:user.email,
            subject:`Sky Link Well password recovery`,
            message

        })
        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`
        })

    }
    catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(500, error.message))
    }

}))

// Router - 5  Reset user password 


router.put('/password/reset/:token', catchAsyncError(async(req,res,next)=>{
    const token = req.params.token;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler(400, "Reset password token is invalid or has been  expired"))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler(400, "Password not matched with confirm password"))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

}))

// Router - 6 Get login user  detail 

router.get('/user/profile', isAuthenenticatedUser, catchAsyncError(async(req,res)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
}))

// Router - 7  Update user password

router.put('/user/password/update', isAuthenenticatedUser , catchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.user.id).select("+password")
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword); 
    if(!isPasswordMatched){
        return next(new ErrorHandler(400, "Password does not with old password"))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler(400, "Password and confirm password does not matched"))
    }

    user.password = req.body.newPassword;
    await user.save()

    sendToken(user, 200 ,res)

}))


//Router - 8  Update user profile

router.put('/user/profile/update', isAuthenenticatedUser , catchAsyncError(async (req , res)=>{
  
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators: true
    });
    
    res.status(200).json({
        success:true,
        message : "Profile updated",
        user

    })

}))


// Router 9 - Admin route to see single user in database

router.get('/admin/all/user/:id', isAuthenenticatedUser, authorizedRoles("admin") , catchAsyncError(async (req,res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(404, `User does not exists with ID: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })

}))

// Router 10  - Admin route to see all user in database

router.get('/admin/all/user', isAuthenenticatedUser, authorizedRoles("admin") , catchAsyncError(async (req,res)=>{

    const user = await User.find();

    res.status(200).json({
        success:true,
        user
    })

}))

// Router 11 - Admin route to change user details

router.put('/admin/update/user/:id', isAuthenenticatedUser, authorizedRoles("admin"), catchAsyncError(async (req,res, next)=>{

    

    let user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(404, "User not found"))
    }

    const newUserData = {
        name: req.body.name,
        email:req.body.email,
        role : req.body.role
    }
   
    user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        message:"User details updated"

    })
}))

// Route 12 - Admin route to delete a user 

router.delete('/admin/delete/user/:id', isAuthenenticatedUser, authorizedRoles('admin'), catchAsyncError(async(req,res,next) =>{

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(404, "User not found"))
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message: "User removed"
    })
}))


module.exports = router;