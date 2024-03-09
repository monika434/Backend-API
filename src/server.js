import express from "express";
import { config } from "dotenv";
import { errorHandler } from "./middleware/error-handler.js";
import {router} from "./routes/studentRoutes.js";
import {connectDB} from "./db.js";

config({path: "./.env.local"});

await connectDB(); // Will throw error at root, if failed

const app = express();

app.use(express.json());  //Its a middleware that provides facility to parse datastream from  client srver
app.use('/api/students', router);  //app.use is middle ware 
app.use(errorHandler);

const port = process.env.PORT ;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});
