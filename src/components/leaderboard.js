import React, { Component } from 'react';
import firebase from './Firebase';
import Showchallenge from './showchallenge';
import ProfessorDashboard from './professorDashboard';
import Login from './login'; 

class Leaderboard extends Component {
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
    this.id = props.id;
    this.challengeNumber = props.challengeNumber;
    this.level = props.level;
    this.show_dashboard = this.show_dashboard.bind(this);
    this.logout = this.logout.bind(this);
  }

  onCollectionUpdate = (querySnapshot) => {
    const challenges = [];
    querySnapshot.forEach((doc) => {
      var {id,marks,level,challengeNumber,array} = doc.data();
      if(parseInt(challengeNumber) === parseInt(this.challengeNumber) && parseInt(level)===parseInt(this.level)){
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
        <ProfessorDashboard id={this.id}/>
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

export default Leaderboard;
