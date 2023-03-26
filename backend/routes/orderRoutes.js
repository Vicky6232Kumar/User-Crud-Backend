const express = require('express');
const router = express.Router();
const Order = require('../database/models/orderModel');
const Product = require('../database/models/productModel')
const { isAuthenenticatedUser, authorizedRoles } = require('../middleware/auth');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');

// Route 1 : Create a order
router.post('/order/new', isAuthenenticatedUser,  catchAsyncError(async(req,res)=>{
    const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, totalPrice, shippingPrice} = req.body
    
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, totalPrice, shippingPrice, paidAt:Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
}))

//Route 2: get Single Order 

router.get('/order/get/:id', isAuthenenticatedUser, catchAsyncError(async (req,res,next)=>{

    const order = await Order.findById(req.params.id).populate('user', "name email")

    if(!order){
        return next(new ErrorHandler(404, "Order not found with id"))
    }

    res.status(200).json({
        success:true,
        order
    })
}))

//Route 3: get loggedin User order

router.get('/orders/my', isAuthenenticatedUser ,  catchAsyncError(async (req,res,next)=>{

    const orders = await Order.find({user: req.user._id})

    if(!orders){
        return next(new ErrorHandler(404, "Order not found with id"))
    }

    res.status(200).json({
        success:true,
        orders
    })
}))


//Route 4: get all order -- Admin Routes 

router.get('/admin/orders', isAuthenenticatedUser, authorizedRoles('admin') ,  catchAsyncError(async (req,res)=>{

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach((order) =>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
}))

//Route 5: update order status-- Admin Routes 

router.put('/admin/order/update/:id', isAuthenenticatedUser , authorizedRoles('admin') ,  catchAsyncError(async (req,res,next)=>{

    const orders = await Order.findById(req.params.id)

    if(!orders){
        return next(new ErrorHandler(404, "Order not found with id"))
    }


    if(orders.orderStatus === "Delivered"){
        return next(new ErrorHandler( 404 ,"You have already delivered this product"))
    }

   orders.orderItems.forEach(async(order)=>{
        await updateStock(order.product, order.Quantity)
    })

    orders.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        orders.deliveredAt = Date.now();
    }


    await orders.save({validateBeforeSave :false})

    res.status(200).json({
        success:true,
        orders
    })
}))

async function updateStock(id,quantity){
    const product = await Product.findById(id)
    product.stock -= quantity
    await product.save({validateBeforeSave: false})
}


//Route 6: delete order -- Admin Routes 

router.delete('/admin/order/delete/:id', isAuthenenticatedUser , authorizedRoles('admin') , catchAsyncError(async (req,res,next)=>{

    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler(404, "Order not found with id"))
    }

    await Order.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true
    })
}))


module.exports = router;
