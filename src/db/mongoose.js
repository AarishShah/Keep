const mongoose = require('mongoose')

mongoose.connect
    (
        'mongodb://127.0.0.1:27017/keep',
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