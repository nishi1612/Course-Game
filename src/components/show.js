import React, { Component } from 'react';
import firebase from './Firebase';
import Showchallenge from './showchallenge';
import StudentDashboard from './studentDashboard';
import Login from './login'; 

class Show extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.collection('challenge');
    this.unsubscribe = null;
    this.state = {
      challenges: [],
      challenge_number : -1,
      showdashboard : false,
      showlogin : false
    };
    this.level = props.level;
    this.id = props.id;
    this.show_func = this.show_func.bind(this);
    this.show_dashboard = this.show_dashboard.bind(this);
    this.logout = this.logout.bind(this);
  }

  onCollectionUpdate = (querySnapshot) => {
    const challenges = [];
    querySnapshot.forEach((doc) => {
      var {level,challengeNumber} = doc.data();
      if(parseInt(level) === parseInt(this.level)){
        challenges.push({
          challengeNumber
        })
      }
    });
    this.setState({
      challenges
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  show_func(challengeNumber){
    this.setState({
      challenge_number : challengeNumber
    });
    return;
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
    if(this.state.challenge_number!==-1){
      return (
        <Showchallenge id={this.id} challengeNumber={this.state.challenge_number} level={this.level}/>
      );
    }else if(this.state.showdashboard === true){
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
          <tr>  <td>Available Challenge Number</td>  </tr>
          {this.state.challenges.map(challenge =>
            <tr>
              <td>
                <button onClick={() => this.show_func(challenge.challengeNumber)}>Challenge {challenge.challengeNumber}</button>
              </td>
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

export default Show;
