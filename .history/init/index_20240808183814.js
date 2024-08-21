import { connect } from "mongoose";
import data from "./data.js";
import { deleteMany, insertMany } from "../models/listing.js";

main()
.then(() =>{
    console.log("connected to DB");   
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await connect(MANGO_URL);
}
 
const initDB =async () =>{
    await deleteMany({});
    await insertMany(initData.data);
    console.log("data was initialized");
    
};
initDB();