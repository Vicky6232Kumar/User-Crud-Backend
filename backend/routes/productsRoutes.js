const express = require('express');
const router = express.Router();
const Product = require('../database/models/productModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorhandler');
const {isAuthenenticatedUser, authorizedRoles} = require('../middleware/auth')
// const {getAllProducts} = require('../controller/productController')


// Route 1: Creating a product  --  Admin route

router.post('/admin/product/new', isAuthenenticatedUser , authorizedRoles("admin") , catchAsyncError(async (req, res) => {

    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })

}))

// Route 2 : Updating a product --Admin route

router.put('/admin/product/:id', isAuthenenticatedUser, authorizedRoles("admin") , catchAsyncError(
    async (req, res) => {

        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }


        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            product
        })

    }
))

// Route 3 : Fetch a single product

router.get('/product/:id', catchAsyncError(
    async (req, res, next) => {

        const product = await Product.findById(req.params.id)

        if (!product) {
            return next(new ErrorHandler(500, "Product not found"))
        }
        res.status(200).json({
            success: true,
            product
        })


    }
))

//Route 4 :Fetching all products

router.get('/products', catchAsyncError(
    async (req, res) => {

        const resultPerPage = 15;
        const productsCount = await Product.countDocuments();
        const apifeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
        
        let products = await apifeature.query;
        let fitlteredProducts = products.length;
        
        // apifeature.search().filter().pagination(resultPerPage);
        // products = await apifeature.query
        

        res.status(200).json({
            success: true,
            products,
            productsCount,
            resultPerPage,
            fitlteredProducts
        })

    }
))


// Route 5 :Delete a product

router.delete('/admin/product/:id', isAuthenenticatedUser, authorizedRoles("admin") , catchAsyncError(
    async (req, res) => {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            })
        }
        product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product removed"
        })

    }
))


// Route 6 :  Add Review of product

router.put('/product/add/review', isAuthenenticatedUser , catchAsyncError(async (req, res)=>{
    const {rating, comment , productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.username,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=> rev.user.toString() === req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
            
        });

    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg += rev.rating;
    })

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        success:true,
        message : "Review submitted"
    })
}))


// Route 7 : Get all reviews of a product 

router.get('/product/all/reviews', catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    
    if(!product){
        return next(new ErrorHandler(404, "Product not found"))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
}))


// Route 8 : Delete a review

router.delete('/product/delete/review', isAuthenenticatedUser , catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    
    if(!product){
        return next(new ErrorHandler(404, "Product not found"))
    }

    const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.reviewId.toString())

    
    let avg = 0;
    reviews.forEach((rev)=>{
        avg += rev.rating;
    })

    const ratings = avg/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{reviews, ratings, numOfReviews}, {
        new: true,
        runValidators: true
    } )

    res.status(200).json({
        success: true,
        messge: "Review deleted"
    })
}))


module.exports = router;