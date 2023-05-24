const mysql = require("mysql")
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"newdata"
})
con.connect((err)=>{
    if(err){
        console.log("error in connection",err);
    }else{
        console.log("database connected");
    }
})

module.exports = con