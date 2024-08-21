const mongoose = require("mongoose");
const data = require("./data.js");
    const Listing = require("../models/listing.js");

const MANGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() =>{
    console.log("connected to DB");   
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MANGO_URL);
}
 
// const initDB =async () =>{
//     // await deleteMany({});
//     await insertMany(initData.data);
//     console.log("data was initialized");
    
// };
// initDB();