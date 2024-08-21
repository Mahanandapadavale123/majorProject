const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();
const ExpressError = require("../util/ExpressErr.js");
const{listingSchema, reviewSchema} =require("../Schema.js");


const validateListing =(req, res, next) =>{
    const { error } = listingSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400,msg);
    }else{
      next();
    }
  };
router.post("/listings/:id/reviews",
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

router.delete("/listings/:id/reviews/:reviewId",
    wrapAsync(async(req, res) =>{
        let {id , reviewId } =req.params;

        await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndRemove(reviewId);

        res.redirect(`/listings/${id}`);
    })
);