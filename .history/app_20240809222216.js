const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const path = require("path");

const MANGO_URL="mongodb://127.0.0.1:27017/wanderlust";


main()
.then( () =>{
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MANGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", (req ,res) => {
 res.send("Hi , I am root");
});

app.get("/listings", async (req, res) =>{
     const allListings = await Listing.find({});
     res.render("/views/listings/index.ejs", {allListings});
    });


// app.get("/testListing", async (req, res) =>{
// let sampleListing = new Listing({
//     title:"My new villa",
//     description:"This is a beautiful villa with a pool",
//     price:1000,
//     location:"goa",
//     country:"India",
// });
// });


//  await sampleListing.save();
//  console.log("sample was saved");
//  res.send(" successful sample was saved");
 

app.listen(3000, () =>{
    console.log("server is listening to port 3000");
    
});


