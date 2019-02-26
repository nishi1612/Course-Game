
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './config/fire';
import Home from './Home';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }

//   signup(e){
//         return (
//             <div className="col-md-6">
//           <h1>You are home</h1>
//           {/* <button onClick={this.logout}>Logout</button> */}
//           </div>
//         );
//     // e.preventDefault();
//     // fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
//     // }).then((u)=>{console.log(u)})
//     // .catch((error) => {
//     //     console.log(error);
//     //   })
//   }

  signup(){
    <Home/>
  }

  render() {
    return (
       <div className="col-md-6">
       <form>
      <div class="form-group">
       <label for="exampleInputEmail1">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
       <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
       <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
      <button onClick={<Home/>} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
 </form>
 
 </div>
    );
  }
}
export default Login;
