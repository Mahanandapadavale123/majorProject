const express = require("express");
const router = express.Router();

const wrapAsync = require("../util/wrapAsync");
const ExpressError = require("../util/ExpressErr.js");
const{ reviewSchema} =require("../Schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//Validation Review

const validateReview =(req, res, next) =>{
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400,msg);
    }else{
      next();
    }
  };

router.post("/",
    validateReview,
    wrapAsync( async(req , res) =>{
    let  listing = await Listing.findById(req.params.id);
   
    let newReview = new Review(req.body.review);
   listing.review.push(newReview);
  
   await newReview.save();
   await listing.save();
  
   console.log("Review was saved");
   res.send("Review was saved");
    })
);

router.delete("/:reviewId",
    wrapAsync(async(req, res) =>{
        let {id , reviewId } =req.params;

        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);

        res.redirect(`/listings/${id}`);
    })
);

module.exports = router;