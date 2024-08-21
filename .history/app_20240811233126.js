const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MANGO_URL="mongodb://127.0.0.1:27017/wanderlust";


main()
.then( () =>{
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MANGO_URL);
}

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("method"));
// app.engine('ejs',ejsMate);
// app.use(express.static(path.join(__dirname,"/public")));

app.get("/", async(req ,res) => {

    let smdata = new Listing({
        title:"titleeeee",
        description : "cdsdddddddddddddddddd",
        price: 1000,
        location: "location",
        country:"India"
    
   })


   let result =  await smdata.save();
   console.log("Insteted")
   console.log(result)

   res.send("Data Saved");

});
 

//index route
app.get("/listings", (req, res) => {
      const allListings = Listing.find({})  
      console.log(allListings);
        
    //   res.render("listings/index.ejs", {allListings});
});


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
 

app.listen(3000, () =>{
    console.log("server is listening to port 3000");
    
});


