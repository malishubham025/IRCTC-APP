const express=require("express");
const bodyParser=require("body-parser");
const mysql=require("mysql");
const app=express();
const cookieParser=require("cookie-parser");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { google } = require("googleapis");
const axios=require("axios");
require('dotenv').config();
const {loginRouter}=require("./routes/userLogin");
const { resolve } = require("url");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// console.log(process.env.client_id);
// app.set("view engine","ejs");
function fun(){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<1e9;i++){}
        resolve("hi");
    })
}
app.get("/",function(req,res){
    fun().then((res1)=>{
        res.send("hello")
    });
    
});

app.use(loginRouter);//handles login-signup

// app.post("/login-google",async (req,res)=>{
//     console.log("code is "+req.body.code);
//     let client_id=process.env.client_id;
//     let client_secret=process.env.client_secret;
//     let client=new google.auth.OAuth2(
//         client_id,
//         client_secret,
//         'postmessage'
//     )
//     let response=await client.getToken(req.body.code);
//     // client.setCredentials(response.tokens);
//     const userRes = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+
//         response.tokens.access_token
//     );
//     let {email,name}=userRes.data;
    
//     console.log("email is "+email+" name is"+name);
//     res.json({"name":"email,name"});
// })




// app.post("/login",function(req,res){
//     const email=req.body.email;
//     const password=req.body.password;
//     // console.log(req.body);
//     // res.send("hi");
//     console.log(process.env.secret);
//     conn.query("select * from users where email=? and password=?",[email,password],function(err,result){
        
//         if(result.length>0){
//             console.log("hi");
//             const user={email:email,password:password};
//             var token = jwt.sign(user, process.env.secret);
//             // const id=setuser(user);
//             // res.cookie("id",id);
//             res.status(200).send({token:token});
//         }
//         else{
//             res.status(404).send();
//         }
//     })
    
    
// });

// app.post("/login-admin",function(req,res){
//     const email=req.body.email;
//     const password=req.body.password;
//     // console.log(req.body);
//     // res.send("hi");
//     console.log(process.env.secret);
//     conn.query("select * from admin where email=? and password=?",[email,password],function(err,result){
        
//         if(result.length>0){
//             // console.log("hi");
//             const user={email:email,password:password,admin:1};
//             var token = jwt.sign(user, process.env.secret);
//             // const id=setuser(user);
//             // res.cookie("id",id);
//             res.status(200).send({token:token});
//         }
//         else{
//             res.status(404).send();
//         }
//     })
    
    
// })

// app.post("/add-train",function(req,res){
//     const source=req.body.source;
//     const destination=req.body.destination;
//     const id=req.body.trainId;
//     const seats=req.body.seats;
//     const name=req.body.name;
//     const date=req.body.date;
//     const time=req.body.time;
//     conn.query("select * from trains where id=? or source=?",[id,source],function(err,result){
//         if(result.length>0){
//             res.status(404).send();
//         }
//         else{
//             conn.query("insert into trains (id,name,source,destination,total_seats,date,time) values (?,?,?,?,?,?,?)",[id,name,source,destination,seats,date,time],function(err1,result1){
        
//                 if(err1){
//                     console.log(err1);
//                     res.status(500).send();
//                 }
//                 else{
//                     res.status(200).send();
//                 }
//             })
//         }
//     })

    
    
// })
// app.post("/remove-train", function (req, res) {
//     const id = req.body.trainId; // Fixed typo
//     console.log("Received ID:", id); // Debugging log

//     conn.query("SELECT * FROM trains WHERE id=?", [id], function (err, result) {
//         if (err) {
//             console.error("Error during select query:", err);
//             return res.status(500).send(); // Internal server error
//         }
//         if (result.length === 0) {
//             return res.status(404).send(); // Not found
//         }

//         conn.query("DELETE FROM trains WHERE id=?", [id], function (err1, result1) {
//             if (err1) {
//                 console.error("Error during delete query:", err1);
//                 return res.status(500).send(); // Internal server error
//             }
//             res.status(200).send(); // Success
//         });
//     });
// });

// app.get("/view-trains", (req, res) => {
//     conn.query("SELECT id, name, source, destination, total_seats AS seats FROM trains", (err, result) => {
//         if (err) {
//             console.error("Error during query:", err);
//             return res.status(500).send({ message: "Internal Server Error" });
//         }
//         if (result.length > 0) {
//             console.log(result);
//             res.status(200).send({ data: result });
//         } else {
//             res.status(404).send({ message: "No trains found" });
//         }
//     });
// });

// app.post("/train-deatails", (req, res) => {
//     const source=req.body.source;
//     const destination=req.body.des;
//     const date=req.body.date;
//     const formattedDate = new Date(date).toISOString().slice(0, 10);
// conn.query(
//     "SELECT * FROM trains WHERE source = ? AND destination = ? AND date = ?",
//     [source, destination, formattedDate],
//     (err, result) => {
//         if (err) {
//             console.error("Error during query:", err);
//             return res.status(500).send({ message: "Internal Server Error" });
//         }
//         if (result.length > 0) {
//             console.log("Result is", result);
//             res.status(200).send(result);
//         } else {
//             console.log(result);
//             res.status(404).send({ message: "No trains found" });
//         }
//     }
// );

// });


// app.post("/signup",function(req,res){
//     const email=req.body.email;
//     const password=req.body.password;
//     // console.log(req.body);
//     // res.send("hi");
//     // console.log(process.env.secret);
//     conn.query("select * from users where email=? ",[email],function(err,result){
        
//         if(result.length>0){
//             // console.log('eerr');
//             res.status(404).send();
//         }
//         else{
//             // console.log("hi");
//             const user={email:email,password:password};
//             var token = jwt.sign(user, process.env.secret);
//             conn.query("insert into users (email,password)values (?,?)",[email,password],function(err,result){
//                 if(!err){
//                     console.log("hi");
//                     res.status(200).send({token:token});
//                 }
//                 else{
//                     console.log(err);
//                     res.status(500).send();
//                 }
//             });
//             // const id=setuser(user);
//             // res.cookie("id",id);
            
//         }
//     })
    
    
// })



app.listen(3001,function(){
    console.log("listen");
})