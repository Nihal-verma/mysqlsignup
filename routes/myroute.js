const express = require("express")
const routes = express.Router()
const data = require("../controller/mysqlapi")
routes.post("/signup",data.mysignup)

module.exports = routes