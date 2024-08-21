const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const ExpressError = require("./util/ExpressErr.js");
const{listingSchema, reviewSchema} =require("./Schema.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./util/wrapAsync.js");

const { wrap } = require("module");
const Review = require("./models/review.js");
const listings =require("./routes/listings.js")


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

app.use("/listings" ,Listing);
app.use("/listings/:id/reviews", Review )

//validation
const validateReview =(req, res, next) =>{
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400,msg);
  }else{
    next();
  }
};

//Reviews
//Post Rout



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
