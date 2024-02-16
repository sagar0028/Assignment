const mongoose = require("mongoose");
require('dotenv').config();
const Users = require("./models/User")

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI;

async function database() {
    let mongooseConnection
    if (process.env.NODE_ENV === 'development') {
      
        if (!global._mongoClientPromise) {
            
            global._mongoClientPromise = await mongoose.connect(uri)
        }
        mongooseConnection = global._mongoClientPromise
    } else {
        mongooseConnection = await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    return {
        mongoose: mongooseConnection,
        User: Users
    }

}

exports.module = database()
