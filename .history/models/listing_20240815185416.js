const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title: 
    {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
         set:(v) => v === "" ? "" : v,
        //  set:(v) => v === "https://media.istockphoto.com/id/543834642/photo/deckchairs-on-jetty.jpg?s=2048x2048&w=is&k=20&c=pt2hslmxW9BeDxbeisVHLufC3H7nUvqITSIOjzXib9Y=" ? "" : v,

    },
    price: Number,
    location: String,
    country:String,
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

