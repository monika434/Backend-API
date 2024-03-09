import express from "express";

import {createStudent,
  deleteById, 
  getStudent,
  getStudentById,
  updateById} 
from "../controller/studentController.js";

export const router = express.Router();

router.route("/").post(createStudent);
router.route("/").get(getStudent);
router.route("/:id").get(getStudentById);
router.route("/:id").put(updateById);
router.route("/:id").delete(deleteById);

