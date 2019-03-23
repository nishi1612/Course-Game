import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';
import Show from './show';

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.ref = firebase.collection('user');
      this.unsubscribe = null;
      this.state = {
        level : 1,
        name : 'Nishi Doshi',
        id : '201601408',
        password : 'hello'
      };
    }

    render() {
      return (
        <div class="container">
          <Show data={this.state.level}/>
        </div>
        
      );
    }
  }
  
  export default Dashboard;