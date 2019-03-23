import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';

class Show extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.collection('challenge');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      var {level,challengeNumber} = doc.data();
      if(level==0){
        boards.push({
          challengeNumber
        })
      }
      
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>ChallengeNumber</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                     <td><Link to={{pathname:"/showChallenge/" + board.challengeNumber}}>Challenge {board.challengeNumber}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;