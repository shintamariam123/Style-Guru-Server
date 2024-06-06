const mongoose = require('mongoose')
const connectionString = process.env.DB_CONNECTION_STRING
mongoose.connect(connectionString).then((res)=>{
    console.log("Style Guru Server successfully connected with MongoDB Atlas");
}).catch((reason)=>{
    console.log("MongoDB Connection Failed!!!");
    console.log(reason);
})