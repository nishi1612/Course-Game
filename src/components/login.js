import React, { Component } from 'react';
import firebase from './Firebase';
import Editquestion from './editquestions';
import StudentDashboard from './studentDashboard';

class Login extends Component {
    constructor(props) {
      super(props);
      this.ref = firebase.collection('user');
      this.unsubscribe = null;
      this.state = {
        users : [],
        done : false,
        student : false,
        id : "",
        level : ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    onCollectionUpdate = (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        var {id,email,name,password,student,level} = doc.data();
        users.push({id,email,name,password,student,level});
      });
      this.setState({
        users : users
     });
    }
  
    componentDidMount() {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    handleSubmit = (event) => {
      event.preventDefault();
      var id = event.target[0].value;
      var password = event.target[1].value;
      for(var i=0;i<this.state.users.length;i++){
        if(this.state.users[i].id === id && this.state.users[i].password === password){
          // alert("Done");
          this.setState({
            done : true,
          });
          if(this.state.users[i].student === true){
            this.setState({
              student : true,
              id : this.state.users[i].id,
              level : this.state.users[i].level
            });
          }
          return ;
        }else if(this.state.users[i].id === id && this.state.users[i].password !== password){
            alert("Please check your password");
            return ;
        }
      }
      alert("Not a valid ID");
      return ;
    }

    render() {
      if(this.state.done===true && this.state.student===true){
        return ( 
          <StudentDashboard level={this.state.level} id={this.state.id}/>
        );
      }else if(this.state.done===true && this.state.student===false){
        return (
          <Editquestion />
        );
      }else{
        return (
          <div className="container">
            <div className = "panel">
              <form onSubmit={this.handleSubmit}>
                <label><input type="text" name="user"></input></label>
                <br />
                <label><input type="text" name="password"></input></label>
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        );
      }
    }
  }
  
  export default Login;
