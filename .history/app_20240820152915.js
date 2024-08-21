const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const ExpressError = require("./util/ExpressErr.js");
const{listingSchema, reviewSchema} =require("./Schema.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { wrap } = require("module");
const Review = require("./models/review.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//validation
const validateListing =(req, res, next) =>{
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400,msg);
  }else{
    next();
  }
};

const validateReview =(req, res, next) =>{
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400,msg);
  }else{
    next();
  }
};


//index route

app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        console.log(allListings);

        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings", err);
        res.status(500).send("Failed to fetch listings");
    }
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//create Route
app.post("/listings",
  validationListing,
  async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
});

//Delete Route
app.delete("/listings/:id",async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndRemove(id);
  res.redirect("/listings");
});

//Reviews
//Post Rout
app.post("/listings/:id/reviews",
  validateReview,
   async(req , res) =>{
  let  listing = await Listing.findById(req.params.id);
 
  let newReview = new Review(req.body.review);
 listing.review.push(newReview);

 await newReview.save();
 await listing.save();

 console.log("Review was saved");
 res.send("Review was saved");
 

})


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


app.all("*" ,( req, res,next) =>{
next( new ExpressError (404, "page not found"));
});

app.use((err , req, res, next) =>{
  let {statusCode=500 , message="page not found"} = Error;
 res.status(statusCode).render("Error.ejs", {message});
})

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});
