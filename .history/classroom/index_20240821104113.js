const express = require("express");
const app=express();
const router =require("./routs/user.js");


app.get("/", (req, res) =>{
    res.send("Hello World");
});

//POST

app.get("/post", (req, res) =>{
    res.send("POSt");
});

//show Rout
app.get("/post/:id" ,(req, res) =>{
    res.send("This is show page")
});

//post
app.post("/post",(req, res) =>{
    res.send("This is post page");
});

//delete
app.delete("post", (req, res) =>{
    res.send("This is delete page");
})



app.listen(8080 ,() =>{
    console.log("Server is working on port 8080");

});

