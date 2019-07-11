import React, { Component } from "react";
import firebase from "./Firebase";
import Showchallenge from "./showchallenge";
import ProfessorDashboard from "./professorDashboard";
import Login from "./login";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.collection("scores");
    this.unsubscribe = null;
    this.state = {
      challenges: [
        { id: 1, challengeNumber: 50, level: 50, marks: 40 },
        { id: 1, challengeNumber: 50, level: 50, marks: 40 },
        { id: 1, challengeNumber: 50, level: 50, marks: 40 }
      ],
      challenge_number: -1,
      showdashboard: false,
      showlogin: false
    };
    this.id = props.id;
    this.challengeNumber = props.challengeNumber;
    this.level = props.level;
    this.show_dashboard = this.show_dashboard.bind(this);
    this.logout = this.logout.bind(this);
  }

  onCollectionUpdate = querySnapshot => {
    const challenges = [];
    querySnapshot.forEach(doc => {
      var { id, marks, level, challengeNumber, array } = doc.data();
      if (
        parseInt(challengeNumber) === parseInt(this.challengeNumber) &&
        parseInt(level) === parseInt(this.level)
      ) {
        challenges.push({ challengeNumber, marks, level });
      }
    });
    //   this.setState({
    //     challenges
    //  });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  show_dashboard() {
    this.setState({
      showdashboard: true
    });
    return;
  }

  logout() {
    this.setState({
      showlogin: true
    });
    return;
  }

  render() {
    if (this.state.showdashboard === true) {
      return <ProfessorDashboard id={this.id} />;
    } else if (this.state.showlogin === true) {
      return <Login />;
    } else {
      let rank = 0;
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <h3 className="mt-4 mb-4">Side Bar</h3>
              <div className="box">
                <h5>Challenge Number</h5>
                <button className="btn btn-success" disabled>
                  {this.props.challengeNumber}
                </button>
              </div>
              <div className="box">
                <h5>Level Number</h5>
                <button className="btn btn-success" disabled>
                  {this.props.levelNumber}
                </button>
              </div>
              <div className="box">
                <h5>Marks</h5>
                <button className="btn btn-success" disabled>
                  -1
                </button>
              </div>
              <div className="m-4">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => this.show_dashboard()}
                >
                  Show Dashboard
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => this.logout()}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="col-md-8">
              <h1 className="m-4">All the Challenges</h1>
              {this.state.challenges.length !== 0 ? (
                this.state.challenges.map(challenge => {
                  rank++;
                  return (
                    <div className="box d-flex">
                      <h3 className="ml-3">{rank}</h3>
                      <div className="m-2 ml-4">
                        <h5>Challenge Number</h5>
                        <div className="btn btn-primary">
                          {challenge.challengeNumber}
                        </div>
                      </div>
                      <div className="m-2 ml-4">
                        <h5>Challenge Level</h5>
                        <div className="btn btn-primary">{challenge.level}</div>
                      </div>
                      <div className="m-2 ml-4">
                        <h5>Challenge Marks</h5>
                        <div className="btn btn-primary">{challenge.marks}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h6 className="form-text text-muted mt-4">
                  There is no challenges available
                </h6>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Leaderboard;
