const mysql=require("mysql");
const conn=mysql.createConnection({
    host:"localhost",
    database:"skillindia",
    password:"root",
    user:"root"
})
conn.connect((err)=>{
    if(err){
        console.log("unable to connect to database");
        console.log(err);
    }
    else{
        console.log("connected to database");
    }
})
module.exports=conn;