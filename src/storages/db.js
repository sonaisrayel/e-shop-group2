import mongoose from 'mongoose';

const { MONGOURL } = process.env;

export async function connection() {
    try {
        await mongoose.connect(MONGOURL);
        console.log('Connected to MongoDB');
    } catch (e) {
        console.log(e.message);
        throw new Error(e.message);
    }
}
