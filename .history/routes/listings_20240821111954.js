const express = require('express0');
const route = express.Routes();
const wrapAsync = require("./util/wrapAsync.js");
const{listingSchema, reviewSchema} =require("./Schema.js");
const ExpressError = require("./util/ExpressErr.js");
const Listing = require("./models/listing.js");


route.get("/listings", wrapAsync(async (req, res) => {
    try {
        const allListings = await Listing.find({});
        console.log(allListings);

        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings", err);
        res.status(500).send("Failed to fetch listings");
    }
}));

//New Route
route.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show Route
route.get("/listings/:id", wrapAsync( async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//create Route
route.post("/listings",
  validateListing,
  wrapAsync( async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

//Edit Route
route.get("/listings/:id/edit",  wrapAsync( async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id);
  res.render("listings/edit.ejs", { listings });
}));

//Update Route
route.put("/listings/:id", wrapAsync(  async (req, res) => {
  const { id } = req.params;
  Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/ ${id}`);
}));

//Delete Route
route.delete("/listings/:id",wrapAsync( async (req, res) => {
  const { id } = req.params;
   const deleteListing = await Listing.findByIdAndDelete(id);
   console.log(deleteListing);
   
  res.redirect("/listings");
}));


module.exports = route;