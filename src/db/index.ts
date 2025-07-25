import mongoose from "mongoose"

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL as string)
        console.log("connected to MongoDB");
        

    }catch(error) {
        console.error("Error connecting to the database:", error)
    }
}

export default connectToDB;