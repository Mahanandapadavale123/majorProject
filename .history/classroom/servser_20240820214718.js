const express = require("express");
const app=require();


app.get("/", (req,res) =>{
    res.send("Hello World");
});

//User
//index Rout
app.get("/user", (req,res) =>{
    res.send("User");
})

//show Rout
app.get("/")


app.listen(8080, (req,res) =>{
    res.send("Server is working now");
});