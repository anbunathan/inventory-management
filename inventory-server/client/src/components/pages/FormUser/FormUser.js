import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import decode from "jwt-decode";

const genderOptions = [
  { key: 'm', text: 'Male', value: 'm' },
  { key: 'f', text: 'Female', value: 'f' },
  { key: 'o', text: 'Do Not Disclose', value: 'o' }
]

const categoryOptions = [
  { key: 'AI', text: 'Machine Learning', value: 'AI' },
  { key: 'IOT', text: 'IoT', value: 'IOT' },
  { key: 'AND', text: 'Android', value: 'AND' },
  { key: 'DM', text: 'Digital Marketing', value: 'DM' },
  { key: 'BC', text: 'Blockchain', value: 'BC' },
  { key: 'RPA', text: 'Robotic Process Automation', value: 'RPA' },
  { key: 'MERN', text: 'Full Stack Web Development', value: 'MERN' },
  { key: 'ROB', text: 'Robotics', value: 'ROB' },
  { key: 'DR', text: 'Drone', value: 'DR' },
]

class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      age: '',
      gender: '',
      mobile: '',
      project: '',
      category: '',
      college: '',
      course: '',
      yearCompletion: '',
      recordExists: false,
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    if (localStorage.bookwormJWT) {
      const payload = decode(localStorage.bookwormJWT);
      const user = {
        email: payload.email,
        username: payload.username,
        confirmed: payload.confirmed
      };
      this.state.name = user.username;
      this.state.email = user.email;
      // this.state.confirmed = user.confirmed;
      console.log("user inside FormUser = ", user);
      console.log("email inside FormUser = ", this.state.email);
      // console.log("confirmed inside FormUser = ",this.state.confirmed);
      console.log("username inside FormUser = ", user.username);
    }


  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.state.email) {
      console.log(`email = ${this.state.email}`)
      // axios.get(`${this.props.server}/api/employees/${this.props.userID}`)
      axios.get(`/api/employees/${this.state.email}`)
        .then((response) => {
          this.setState({
            name: response.data.name,
            email: response.data.email,
            age: (response.data.age === null) ? '' : response.data.age,
            gender: response.data.gender,
            mobile: response.data.mobile,
            project: response.data.project,
            yearCompletion: (response.data.yearCompletion === null) ? '' : response.data.yearCompletion,
            category: response.data.category,
            college: response.data.college,
            course: response.data.course,
          });
          if (this.state.name) {
            this.setState({ recordExists: true });
          }

        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ gender: data.value });
  }

  handleCategoryChange(e, data) {
    this.setState({ category: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    console.log(`name = ${this.state.name}`)
    console.log(`email = ${this.state.email}`)
    console.log(`age = ${this.state.age}`)
    console.log(`gender = ${this.state.gender}`)

    const user = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      gender: this.state.gender
    }

    if (this.state.recordExists) {
      axios.post("/api/employees/update", {
        name: this.state.name,
        email: this.state.email,
        age: this.state.age,
        gender: this.state.gender,
        mobile: this.state.mobile,
        project: this.state.project,
        category: this.state.category,
        college: this.state.college,
        course: this.state.course,
        yearCompletion: this.state.yearCompletion
      })
        .then((response) => {
          this.setState({
            formClassName: 'success',
            formSuccessMessage: response.data.msg
          });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              this.setState({
                formClassName: 'warning',
                formErrorMessage: err.response.data.msg
              });
            }
          }
          else {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: 'Something went wrong. ' + err
            });
          }
        });
    }
    else {
      axios.post("/api/employees/putData", {
        name: this.state.name,
        email: this.state.email,
        age: this.state.age,
        gender: this.state.gender,
        mobile: this.state.mobile,
        project: this.state.project,
        category: this.state.category,
        college: this.state.college,
        course: this.state.course,
        yearCompletion: this.state.yearCompletion
      })
        .then((response) => {
          this.setState({
            formClassName: 'success',
            formSuccessMessage: response.data.msg
          });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              this.setState({
                formClassName: 'warning',
                formErrorMessage: err.response.data.msg
              });
            }
          }
          else {
            this.setState({
              formClassName: 'warning',
              formErrorMessage: 'Something went wrong. ' + err
            });
          }
        });
    }
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <div>
        <div className='User'>
          <div className='User-header'>
            <h1 className='User-intro'>Intern's Profile</h1>
          </div>
        </div>
        <Form className={formClassName} onSubmit={this.handleSubmit}>
          <Form.Input
            label='Name'
            type='text'
            placeholder='Elon Musk'
            name='name'
            maxLength='40'
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Email'
            type='email'
            name='email'
            maxLength='40'
            required
            value={this.state.email}
          />
          <Form.Group widths='equal'>
            <Form.Input
              label='Age'
              type='number'
              placeholder='18'
              min={5}
              max={130}
              name='age'
              value={this.state.age}
              onChange={this.handleInputChange}
            />
            <Form.Field
              control={Select}
              label='Gender'
              options={genderOptions}
              placeholder='Gender'
              value={this.state.gender}
              onChange={this.handleSelectChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label='Project'
              type='text'
              placeholder='Project Title'
              name='project'
              value={this.state.project}
              onChange={this.handleInputChange}
            />
            <Form.Field
              control={Select}
              label='Project Category'
              options={categoryOptions}
              placeholder='Category'
              value={this.state.category}
              onChange={this.handleCategoryChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label='College'
              type='text'
              placeholder='College Name'
              name='college'
              value={this.state.college}
              onChange={this.handleInputChange}
            />
            <Form.Input
              label='Course'
              type='text'
              placeholder='Course Name'
              name='course'
              value={this.state.course}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label='Mobile'
              type='number'
              placeholder='9986213430'
              name='mobile'
              value={this.state.mobile}
              onChange={this.handleInputChange}
            />
            <Form.Input
              label='Year of Completion'
              type='number'
              placeholder='2022'
              name='yearCompletion'
              value={this.state.yearCompletion}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Message
            success
            color='green'
            header='Nice one!'
            content={formSuccessMessage}
          />
          <Message
            warning
            color='yellow'
            header='Woah!'
            content={formErrorMessage}
          />
          <Button primary floated='right'>Submit</Button>
          <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
        </Form>
      </div>
    );
  }
}

export default FormUser;
