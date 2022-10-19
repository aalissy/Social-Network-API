// Connect and connection require mongoose
const { connect, connection } = require('mongoose');

const connectionString =  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Exporting the connection
module.exports = connection;