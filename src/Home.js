import React, { Component } from 'react';
import fire from './config/fire';
import './App.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

class Home extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
          email: '',
          password: ''
        };
      }
      
    logout(e){
        fire.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

  render() {
    return (
        <div className="col-md-6">
      <h1>You are home</h1>
      <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
