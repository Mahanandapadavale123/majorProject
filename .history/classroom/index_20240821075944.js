const express = require("express");
const app=express();


app.get("/", (req, res) =>{
    res.send("Hello World");
});

//User
//index Rout
app.get("/user", (req, res) =>{
    res.send("User");
})

//show Rout
app.get("/user/:id" ,(req, res) =>{
    res.send("This is show page")
});

//post
app.post("/user",(req, res) =>{
    res.send("This is post page");
});

//delete
app.delete("/", (req, res) =>{
    res.send("This is delete page");
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

