const asyncHandler = require("express-async-handler"); // middleware instead of try catch we use this to handle error
const { Client } = require('pg');
//const { connectDB } = require('./db');
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
client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database',dbConfig.database,dbConfig.port);

    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });

//@desc create student
//@route POST /api/student
//access public
const createStudent = asyncHandler(async(req,res) => {
    console.log(req.body)
    console.log('this is body given from client',req.body);
    const{name,email,phone} = req.body;
    client.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log('Query result:', result.rows);
      res.status(201).json({message : result.rows})
    });
});

//@desc get all student
//@route GET  /api/student
//access public
const getStudent =  (req,res) => {
    console.log("Connection Working");
    client.query('SELECT * FROM students', function (err, result) {
        if (err) throw err;
        console.log("Getting RECORDS");
        console.log('Query result:', result.rows);
        res.status(200).json({message : result.rows})
      });
};

//@desc get  student By Id
//@route GET /api/student/:id
//access public
const getStudentById = asyncHandler(async(req,res) => {
    client.query(`Select * From Students WHERE StudentID=${req.params.id}`, function (err, result) {
        if (err) throw err;
        console.log("Getting RECORDS");
        console.log('Query result:', result.rows);
        res.status(200).json({message : result.rows})
      });
   // res.status(200).json({message : `Get student detail by ID ${req.params.id}`})
});

//@desc Update student By id
//@route PUT /api/student:id
//access public
const updateById = asyncHandler(async(req,res) => {
    var sql = `INSERT INTO Students ( LastName, FirstName, City, Email)
    VALUES ('Bhuskat', 'Prajyot', 'Pune', 'test3@gmail.com')`;
    client.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      console.log('Query result:', result.rows);
    });
    res.status(200).json({message : `Update Student for ${req.params.id}`})
});

//@desc Delete student by Id
//@route DELETE /api/student:id
//access public
const deleteById = asyncHandler(async(req,res) => {
    client.query(`delete from Students where StudentID=${req.params.id}`, function (err, result) {
        if (err) throw err;
        console.log("Getting RECORDS");
        console.log('Query result:', result.rows);
        res.status(200).json({message : result.rows})
      });
    //res.status(200).json({message : `Delete student for  ${req.params.id}`})
});
module.exports = {createStudent,getStudent,getStudentById,updateById,deleteById};