const express = require('express');
const router = express.Router();
const wrapAsync = require("../util/wrapAsync.js");
const{listingSchema } =require("../Schema.js");
const ExpressError = require("../util/ExpressErr.js");
const Listing = require("../models/listing.js");

const validateListing =(req, res, next) =>{
    const { error } = listingSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400,msg);
    }else{
      next();
    }
  };
router.get("/", wrapAsync(async (req, res) => {
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
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show Route
router.get("/:id", wrapAsync( async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//create Route
router.post("/",
  validateListing,
  wrapAsync( async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit",  wrapAsync( async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id);
  res.render("listings/edit.ejs", { listings });
}));

//Update Route
router.put("/:id", wrapAsync(  async (req, res) => {
  const { id } = req.params;
  Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/ ${id}`);
}));

//Delete Route
router.delete("/:id",wrapAsync( async (req, res) => {
  const { id } = req.params;
   const deleteListing = await Listing.findByIdAndDelete(id);
   console.log(deleteListing);
   
  res.redirect("/listings");
}));


module.exports = router;