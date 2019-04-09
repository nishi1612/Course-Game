import React, { Component } from 'react';
import firebase from './Firebase';
import Showchallenge from './showchallenge';
import StudentDashboard from './studentDashboard';
import Login from './login'; 

class Idscoreboard extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.collection('scores');
    this.unsubscribe = null;
    this.state = {
      challenges: [],
      challenge_number : -1,
      showdashboard : false,
      showlogin : false
    };
    this.level = props.level;
    this.id = props.id;
    this.show_dashboard = this.show_dashboard.bind(this);
    this.logout = this.logout.bind(this);
  }

  onCollectionUpdate = (querySnapshot) => {
    const challenges = [];
    querySnapshot.forEach((doc) => {
      var {id,marks,level,challengeNumber,array} = doc.data();
      if(parseInt(id) === parseInt(this.id)){
        challenges.push({challengeNumber,marks,level})
      }
    });
    this.setState({
      challenges
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  show_dashboard(){
    this.setState({
      showdashboard : true
    })
    return ;
  }

  logout(){
    this.setState({
      showlogin : true
    });
    return ;
  }

  render() {
    if(this.state.showdashboard === true){
      return (
        <StudentDashboard id={this.id} level={this.level} />
      );
    }else if(this.state.showlogin === true){
      return (
        <Login />
      );
    }else{
    return (
      <div className="container">
        <table>
          <tr>  <td>Challenge Number</td>  <td>Level Number</td> <td>Marks</td></tr>
          {this.state.challenges.map(challenge =>
            <tr>
              <td>{challenge.challengeNumber}</td>
              <td>{challenge.level}</td>
              <td>{challenge.marks}</td>
            </tr>
          )}
          <tr><td><button onClick={() => this.show_dashboard()}>Show Dashboard</button></td></tr>
          <tr><td><button onClick={() => this.logout()}>Logout</button></td></tr>
        </table>  
      </div>
    );
  }
}
}

export default Idscoreboard;
