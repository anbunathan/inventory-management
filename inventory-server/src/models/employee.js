const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed {ARGS[1]} characters.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Email must be valid.'
  })
];

const ageValidator = [
  // TODO: Make some validations here...
];

const mobileValidator = [
  // TODO: Make some validations here...
];

const genderValidator = [
  // TODO: Make some validations here...
];

const projectValidator = [
  // TODO: Make some validations here...
];

const categoryValidator = [
  // TODO: Make some validations here...
];

const collegeValidator = [
  // TODO: Make some validations here...
];

const courseValidator = [
  // TODO: Make some validations here...
];

const yearValidator = [
  // TODO: Make some validations here...
];

// Define the database model
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: emailValidator
  },
  age: {
    type: Number,
    validate: ageValidator
  },
  mobile: {
    type: Number,
    required: [true, 'Mobile is required.'],
    validate: mobileValidator
  },
  project: {
    type: String,
    required: [true, 'Project is required.'],
    validate: projectValidator
  },
  category: {
    type: String,
    required: [true, 'Project Category is required.'],
    validate: categoryValidator
  },
  college: {
    type: String,
    required: [true, 'College is required.'],
    validate: collegeValidator
  },
  course: {
    type: String,
    required: [true, 'Course is required.'],
    validate: courseValidator
  },
  yearCompletion: {
    type: Number,
    validate: yearValidator
  },
  gender: {
    type: String,
    required: [true, 'Gender is required.'],
    validate: genderValidator
  }
});

// Use the unique validator plugin
employeeSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Employee = module.exports = mongoose.model('employee', employeeSchema);
