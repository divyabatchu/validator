import React, {Component}from 'react';

import './App.css';
//import AthunticationProcess from './Auth/athuntication-process'
//import data from './data/dashboard.json'
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:null,
      password:null,
      formErrors: {
        email:"",
        password:""
      }
    };

   
  }
handleSubmit = e => {
  e.preventDefault(); 

  if (formValid(this.state.formErrors)){
    console.log(`
    Email: ${this.state.email}
    Password: ${this.state.password}
    
    `)
  }else {
    console.error('FORM INVALID');
  }
  
};

handleChange = e => {
  e.preventDefault();
  const { name, value } = e.target;
  let formErrors = this.state.formErrors;

 
  switch (name) {
    case "email":
      formErrors.email =
      emailRegex.test(value) && value.length > 0
      ? ''
      : 'invalid email address';
      break;
      case "password":
        formErrors.password =
        value.length < 6 && value.length > 0
        ? "minimum 6 characters require"
        :"";
        break;
        default:
          break;
       
  }

  this.setState({ formErrors, [name]: value}, () => console.log(this.state));
};
  render(){
    const {formErrors} = this.state
  return (
    <div className="wrapper">
    <div className="form-wrapper">
      <h1>Login Form</h1>
      <form onSubmit={this.handleSubmit} noValidate >
        <div className="email">
          <label htmlFor="email">Username</label>
          <input 
          className={formErrors.email.length > 0 ? "error" : null}
          placeholder="username"
          type="email"
          name="email"
          onChange={this.handleChange}
          />

          { formErrors.email.length > 0 && (
            <span className="errorMessage">{formErrors.email}</span>
          )}
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
          <input 
           className={formErrors.password.length > 0 ? "error" : null}
          placeholder="Password"
          type="password"
          name="password"
          onChange={this.handleChange}
          />
          { formErrors.password.length > 0 && (
            <span className="errorMessage">{formErrors.password}</span>
          )}
        </div>
        <div className="loginForm">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    
    </div>
  );
}
}

export default Login;
