const mongoose = require('mongoose');

const { ServerApiVersion } = require('mongodb');

 const connectToDatabase=()=>{

    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
         serverApi: ServerApiVersion.v1
        
    }).then((data)=>{
        console.log(`Database connected with server : ${data.connection.host}`)
        
    })
 }  
    


module.exports = connectToDatabase;