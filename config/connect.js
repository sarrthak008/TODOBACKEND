import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_URI).then(() => {
            console.log('connet to db...')
        })
    } catch (error) {
        console.log('connecting error', error)
    }
}

export default connectDB