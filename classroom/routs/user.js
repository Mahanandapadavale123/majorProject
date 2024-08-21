const express = require("express");
const router = express.Router();


router.get("/users", (req, res) =>{
    res.send("User");
})

//show Rout
router.get("/users/:id" ,(req, res) =>{
    res.send("This is show page")
});

//post
router.post("/users",(req, res) =>{
    res.send("This is post page");
});

//delete
router.delete("/users", (req, res) =>{
    res.send("This is delete page");
});

module.exports = router;
