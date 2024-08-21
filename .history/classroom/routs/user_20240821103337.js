const express = require("express");
const router = express.Router();


router.get("/user", (req, res) =>{
    res.send("User");
})

//show Rout
router.get("/user/:id" ,(req, res) =>{
    res.send("This is show page")
});

//post
router.post("/user",(req, res) =>{
    res.send("This is post page");
});

//delete
router.delete("/", (req, res) =>{
    res.send("This is delete page");
});

module.exports = router;
