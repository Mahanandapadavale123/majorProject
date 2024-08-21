const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("method"));
app.engine('ejs',ejsMate);

app.get("/", (req ,res) => {
 res.send("Hi , I am root");
});
 

//index route
app.get("/listings", async (req, res) =>{
     const allListings = await Listing.find({});
     res.render("listings/index.ejs", {allListings});
    });

//New Route
app.get("/listings/new", (req ,res) =>{
    res.render("listings/new.ejs");
})



    //show Route
   app.get("/listings/:id",async(req, res) =>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
   });

   //create Route
   app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
   });

   //Edit Route
   app.get("/listings/:id/edit", async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
   })

    //Update Route
    app.put("/listings/:id", async (req, res ) =>{
        const {id} = req.params;
        Listing.findByIdAndUpdate(id, {...req.body.listing});
        res.redirect("/listings");
    });

    //Delete Route
    app.delete("/listings/:id", async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndRemove(id);
    res.redirect("/listings");
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


