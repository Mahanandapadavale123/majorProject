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
