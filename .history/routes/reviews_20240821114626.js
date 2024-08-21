const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();

app.post("/listings/:id/reviews",
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