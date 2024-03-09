const express  = require('express');
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes/studentRoutes');
const dotenv = require('dotenv').config();
const app = express();
const { Client } = require('pg');
const asyncHandler = require('express-async-handler');
const{createStudent,getStudent,getStudentById,updateById,deleteById} = require("../Backend-API/controller/studentController");


const port = process.env.PORT ;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

app.use(express.json());  //Its a middleware that provides facility to parse datastream from  client srver

app.use('/api/students', router);  //app.use is middle ware 
app.use(errorHandler);

router.route("/").post(createStudent);
router.route("/").get(getStudent);
router.route("/:id").get(getStudentById);
router.route("/:id").put(updateById);
router.route("/:id").delete(deleteById);
