import mongoose from "mongoose";
let isConnected : boolean=false;
async function dbConnect(){
    if(isConnected){
        console.log("Already connected to Database")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || "")
        isConnected=true
        console.log("DB connected")
    } catch (error) {
        console.log("DB Connection failed",error)
        process.exit(1)        
    }
}

export default dbConnect;