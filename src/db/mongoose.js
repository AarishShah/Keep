//require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const mongoose = require('mongoose')

// Construct the MongoDB Atlas connection URI
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const clusterUrl = process.env.DB_CLUSTER_URL;
const dbName = 'keep';
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;


mongoose.connect
    (
        uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
            // useFindAndModify: false // set true by default, this will address the depracation warnings
        }
    ).catch(error => {
        console.error("Database connection failed:", error);
        process.exit(1); // Optionally exit the process if unable to connect
    });
    
    // will keep listening to the events and throw error if any during the entire connection process
    mongoose.connection.on('error', err => {
        console.error('Mongoose connection error:', err);
    });
    
    // to check only once if the connection is "open"
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB successfully!');
    });
