import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log("mongoose connected")
    } catch (error) {
        throw new Error("Error connecting to mongo")
    }
}

export default connectDB