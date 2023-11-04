const express = require('express');
const mongoose =require("mongoose")
require("dotenv").config()

const app = express();


const productrouter = require('./routes/products.router');

app.use(express.json());

app.use('/api/products', productrouter);

app.get("/",(req,res,next)=>{
    res.send("<h1> HELLO <h1>");
})



mongoose.connect(`${process.env.DB_URL}`).then(result => {
    console.log("5000번 포트에 연결되었습니다")
    app.listen(5000)
}).
catch(err=>{
    console.log(err);

})


