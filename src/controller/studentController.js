import { getClient } from "../db.js";

const client = getClient();

//@desc create student
//@route POST /api/student
//access public
export const createStudent = async(req, res) => {
  try{
    const result = await client.query(`
      INSERT INTO STUDENTS ( first_name, last_name, city, phone, email) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [req.body.firstName, req.body.lastName, req.body.city, req.body.phone, req.body.email]);
    return res.status(200).json({rowCount: result.rowCount, id: result.rows[0].id});
  }catch(err){
    console.error("Error while saving request to database", err);
    throw err;
  }    
};

//@desc get all student
//@route GET  /api/student
//access public
export const getStudent = async (_req,res) => {
  try{
    const result = await client.query('SELECT * FROM students');
    return res.status(200).json({message : result.rows})
  }catch(err){
    console.error("Error while fetching student records from database", err);
    throw err;
  }
  
};

//@desc get  student By Id
//@route GET /api/student/:id
//access public
export const getStudentById = async(req, res) => {
  try{
    const result = await client.query(
      `Select * From Students WHERE id=$1`,
      [req.params.id]);
    return res.status(200).json({message : result.rows})
  }catch(err){
    console.error(`Error while fetching student record with id: ${req.params.id}`);
    throw err;
  }
};

//@desc Update student By id
//@route PUT /api/student:id
//access public
export const updateById = async(req,res) => {
  try{
    const sql = `UPDATE STUDENTS SET first_name = $1, last_name = $2, city = $3, phone = $4, email = $5 WHERE id = $6`;
    const result = await client.query(sql, [req.body.firstName, req.body.lastName, req.body.city, req.body.phone, req.body.email, req.params.id]);
    return res.status(200).json({rowCount: result.rowCount});
  }catch(err){
    console.error(`Error while updating records in database for id: ${req.params.id}`)
    throw err;
  }    
};

//@desc Delete student by Id
//@route DELETE /api/student:id
//access public
export const deleteById = async(req,res) => {
  try{
    const result = await client.query(
      `delete from Students where id=$1`,
      [req.params.id]
    );
    return res.status(200).json({message : result.rowCount});
  }catch(err){
    console.error(`Error occurred while deleting record for student id: ${req.params.id}`);
    throw err;
  }
};
