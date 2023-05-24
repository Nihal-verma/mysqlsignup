const express = require("express")
const con = require("./config")
const routes = require("./routes/myroute")
const app = express()
const port = 3030
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)
app.listen(port,()=>{console.log(`server is running on port no. ${port}`);})