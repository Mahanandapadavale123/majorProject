const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connecting to MongoDB
async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Failed to connect to DB");
        console.error(err);
    }
}

main();

// Setting up middlewares and view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Root route
app.get("/", async (req, res) => {
    try {
        let smdata = new Listing({
            title: "Vikas Poute",
            description: "cdsdddddddddddddddddd",
            price: 1000,
            location: "location",
            country: "India"
        });

        let result = await smdata.save();
        console.log("Inserted");
        console.log(result);

        res.send("Data Saved");
    } catch (err) {
        console.error("Error inserting data", err);
        res.status(500).send("Failed to save data");
    }
});

// Index route
app.get("/listing", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        console.log(allListings);

        // res.render("listings/index.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings", err);
        res.status(500).send("Failed to fetch listings");
    }
});

// Test route to create and save a sample listing
app.get("/testListing", async (req, res) => {
    try {
        let sampleListing = new Listing({
            title: "My new villa",
            description: "This is a beautiful villa with a pool",
            price: 1000,
            location: "Goa",
            country: "India"
        });

        await sampleListing.save();
        console.log("Sample was saved");
        res.send("Sample was saved successfully");
    } catch (err) {
        console.error("Error saving sample listing", err);
        res.status(500).send("Failed to save sample listing");
    }
});

// Starting the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
