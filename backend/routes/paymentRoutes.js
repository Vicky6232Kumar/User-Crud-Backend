const express = require('express');
const router = express.Router();
const { isAuthenenticatedUser } = require('../middleware/auth');
const catchAsyncError = require('../middleware/catchAsyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY);

router.post('/payment/process',isAuthenenticatedUser , catchAsyncError(async(req,res) => {
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency : "inr",
        metadata :{
            company : "Online Buy"
        }
    })
    res.status(200).json({success: true, client_secret : myPayment.client_secret})

}))


router.get('/stripeapikey',isAuthenenticatedUser , catchAsyncError(async(req,res) => {
   
    res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY})

}))

module.exports = router