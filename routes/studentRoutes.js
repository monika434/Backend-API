const express = require("express");
const router = express.Router();

const{createStudent,getStudent,getStudentById,updateById,deleteById} = require("../controller/studentController");

router.route("/").post(createStudent);
router.route("/").get(getStudent);
router.route("/:id").get(getStudentById);
router.route("/:id").put(updateById);
router.route("/:id").delete(deleteById);

module.exports = router;