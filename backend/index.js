const app = require('./app');
const cloudinary = require("cloudinary")
// Config Files -------

const dotenv = require('dotenv')
dotenv.config({path:"backend/config/config.env"})

// Handling Uncaught exception

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to uncaughtException");

    process.exit(1)
})


// Connnection established with database ------

const connectToDatabase = require('./database/db')
connectToDatabase();

// Config cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRECT

})

//Server listener

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})

// Unhandled promise rejection 

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to unhandledRejection");

    server.close(()=>{
        process.exit(1)
    })
})