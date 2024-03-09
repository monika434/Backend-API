import pg from 'pg';
import {config} from "dotenv";

config({path: "./.env.local"});

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
};

// Database client
const Client = pg.Client;
let client;

// Return database client to other modules
export const getClient = () => {
  if(!client){
    client = new Client(dbConfig);
  }
  return client;
}

// Connect to DB. Run at start of application
export const connectDB = async () =>{
  try{
    getClient();
    await client.connect();
    console.log('Connected to PostgreSQL database:', dbConfig.database, dbConfig.port);
  }catch(err){
    console.error('Error connecting to PostgreSQL database', err);
    throw err;
  }
};
