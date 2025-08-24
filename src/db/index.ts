import mongoose from "mongoose"
import logger from "../utils/logger"
const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL as string)
        logger.info("connected to MongoDB");
        

    }catch(error) {
        logger.error("Error connecting to the database:", error)
    }
}

export default connectToDB;