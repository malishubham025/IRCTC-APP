const express=require("express");
const bodyParser=require("body-parser");
const mysql=require("mysql");
const app=express();
const cookieParser=require("cookie-parser");
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// app.set("view engine","ejs");
app.get("/",function(req,res){
    res.send("hello");
})

const conn=mysql.createConnection({
    host:"localhost",
    database:"skillindia",
    password:" ",
    user:"root"
})
conn.connect((err)=>{
    if(err){
        console.log("unable to connect ");
        console.log(err);
    }
    else{
        console.log("connected");
    }
})

app.post("/login",function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    // console.log(req.body);
    // res.send("hi");
    console.log(process.env.secret);
    conn.query("select * from users where email=? and password=?",[email,password],function(err,result){
        
        if(result.length>0){
            console.log("hi");
            const user={email:email,password:password};
            var token = jwt.sign(user, process.env.secret);
            // const id=setuser(user);
            // res.cookie("id",id);
            res.status(200).send({token:token});
        }
        else{
            res.status(404).send();
        }
    })
    
    
});

app.post("/login-admin",function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    // console.log(req.body);
    // res.send("hi");
    console.log(process.env.secret);
    conn.query("select * from admin where email=? and password=?",[email,password],function(err,result){
        
        if(result.length>0){
            // console.log("hi");
            const user={email:email,password:password,admin:1};
            var token = jwt.sign(user, process.env.secret);
            // const id=setuser(user);
            // res.cookie("id",id);
            res.status(200).send({token:token});
        }
        else{
            res.status(404).send();
        }
    })
    
    
})
app.post("/signup",function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    // console.log(req.body);
    // res.send("hi");
    // console.log(process.env.secret);
    conn.query("select * from users where email=? ",[email],function(err,result){
        
        if(result.length>0){
            // console.log('eerr');
            res.status(404).send();
        }
        else{
            // console.log("hi");
            const user={email:email,password:password};
            var token = jwt.sign(user, process.env.secret);
            conn.query("insert into users (email,password)values (?,?)",[email,password],function(err,result){
                if(!err){
                    console.log("hi");
                    res.status(200).send({token:token});
                }
                else{
                    console.log(err);
                    res.status(500).send();
                }
            });
            // const id=setuser(user);
            // res.cookie("id",id);
            
        }
    })
    
    
})



app.listen(3001,function(){
    console.log("listen");
})