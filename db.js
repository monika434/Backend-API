const { Client } = require('pg');
const { connect } = require('./routes/studentRoutes');

// Database connection configuration
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'TestDB',
    password: 'Gre@pass',
    port: 5432
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);
const connectDB = () =>{
    client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database',dbConfig.database,dbConfig.port);

    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });
};
 module.exports = {connectDB};