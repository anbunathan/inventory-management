const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const Employee = require('../models/employee');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// READ (ONE)
router.get('/:email', (req, res) => {
  console.log(`email = ${req.params.email}`)
  let email = req.params.email
  Employee.findOne({"email":email})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such employee.` });
    });
});

router.post("/putData", (req, res) => {
  let employee = new Employee();

  const { name, email, age, mobile, project, category,
    college, course, yearCompletion, gender} = req.body;
  console.log(`name = ${name}`)
  console.log(`email = ${email}`)
  console.log(`age = ${age}`)
  console.log(`gender = ${gender}`)
  if (!email) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  employee.name = name;
  employee.email = email;
  employee.age = age;
  employee.gender = gender;
  employee.mobile = mobile;
  employee.project = project;
  employee.category = category;
  employee.college = college;
  employee.course = course;
  employee.yearCompletion = yearCompletion;
  employee.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// READ (ALL)
router.get('/', (req, res) => {
  console.log(`all records`)
  Employee.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});


// UPDATE
router.post('/update', (req, res) => {
  let updatedUser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    mobile: req.body.mobile,
    project: req.body.project,
    category: req.body.category,
    college: req.body.college,
    course: req.body.course,
    yearCompletion: req.body.yearCompletion
  };

  Employee.findOneAndUpdate({ email: req.body.email }, updatedUser, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Employee.findOne({ email: req.body.email })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              name: newResult.name,
              email: newResult.email,
              age: newResult.age,
              gender: newResult.gender,
              mobile: newResult.mobile,
              project: newResult.project,
              category: newResult.category,
              college: newResult.college,
              course: newResult.course,
              yearCompletion: newResult.yearCompletion
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.email) {
          res.status(400).json({ success: false, msg: err.errors.email.message });
          return;
        }
        if (err.errors.age) {
          res.status(400).json({ success: false, msg: err.errors.age.message });
          return;
        }
        if (err.errors.gender) {
          res.status(400).json({ success: false, msg: err.errors.gender.message });
          return;
        }
        if (err.errors.mobile) {
          res.status(400).json({ success: false, msg: err.errors.mobile.message });
          return;
        }
        if (err.errors.project) {
          res.status(400).json({ success: false, msg: err.errors.project.message });
          return;
        }
        if (err.errors.category) {
          res.status(400).json({ success: false, msg: err.errors.category.message });
          return;
        }
        if (err.errors.college) {
          res.status(400).json({ success: false, msg: err.errors.college.message });
          return;
        }
        if (err.errors.course) {
          res.status(400).json({ success: false, msg: err.errors.course.message });
          return;
        }
        if (err.errors.yearCompletion) {
          res.status(400).json({ success: false, msg: err.errors.yearCompletion.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

module.exports = router;

