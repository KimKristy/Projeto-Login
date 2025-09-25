const express = require("express")
const fs = require("fs")  //file system
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("josnwebtoken")
const cors = require("cors")

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

app.listen(port,()=>{
    console.log(`server rodando http://localhost:${port}`)
})