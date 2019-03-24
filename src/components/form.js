import React, { Component } from 'react';
import firebase from './Firebase';
class Loginform extends Component {

  constructor(props) {
    super(props);
    this.state = {id: '' , password:''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.ref = firebase.collection('user');
    this.unsubscribe = null;
    onCollectionUpdate = (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const {id,password} = doc.data();
        users.push({
          key: doc.id,
          doc, // DocumentSnapshot
          id,password
        });
      });
    }
  }

  render() {
    return (
      <div className="loginform">
        <form onSubmit={this.handleSubmit}>
          <label>ID:<input type="text" name="id" value={this.state.id} onChange={this.handleInputChange}/></label>
          <label>Password<input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}/></label>
          <input type="submit" value="Submit" />
        </form>
      </div>

    );
  }
}

export default Loginform;
