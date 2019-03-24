import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';

class Show extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.collection('challenge');
    this.unsubscribe = null;
    this.state = {
      challenges: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const challenges = [];
    querySnapshot.forEach((doc) => {
      var {level,challengeNumber} = doc.data();
      if(level>=this.props.match.params.id){
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

  render() {
    return (
      <div className="container">
        <table>
          <tr>  <td>ChallengeNumber</td>  </tr>
          {this.state.challenges.map(challenge =>
            <tr>
              <td><Link to={{pathname:"/showChallenge/" + challenge.challengeNumber}}>Challenge {challenge.challengeNumber}</Link></td>
            </tr>
          )}
        </table>  
      </div>
    );
  }
}

export default Show;