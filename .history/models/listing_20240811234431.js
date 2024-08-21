const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true // Removes any whitespace around the title
    },
    description: {
        type: String,
        trim: true // Removes any whitespace around the description
    },
    image: {
        type: String,
        set: (v) => v === "" ? "" : v,
        default: "" // Default value for the image
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensures that the price is not negative
    },
    location: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    }
});

// Create the model from the schema
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
