import React, { Component } from "react";
import Login from "./login";
import Addquestion from "./addquestion";
import Editquestion from "./editquestions";
import Leaderboard from "./leaderboard";

class ProfessorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_login: false,
      show_add_challenge: false,
      show_edit_challenge: false,
      level: -1,
      challenge: -1,
      showLeaderboard: false,
      challengeNumber: -1,
      levelNumber: -1,
      isValidSelection: false
    };
    this.id = props.id;
    this.add_challenge = this.add_challenge.bind(this);
    this.edit_challenge = this.edit_challenge.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmittwo = this.handleSubmittwo.bind(this);
    this.handleSubmitthree = this.handleSubmitthree.bind(this);
    this.show_leaderboard = this.show_leaderboard.bind(this);
  }

  show_leaderboard() {
    this.setState({
      showLeaderboard: true
    });
    return;
  }

  logout() {
    this.setState({
      showlogin: true
    });
    return;
  }

  add_challenge() {
    this.setState({
      show_add_challenge: true
    });
    return;
  }

  edit_challenge() {
    this.setState({
      show_edit_challenge: true
    });
    return;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      level: parseInt(event.target[0].value)
    });
    return;
  };

  handleSubmittwo = event => {
    event.preventDefault();
    this.setState({
      level: parseInt(event.target[0].value),
      challenge: parseInt(event.target[1].value)
    });
    return;
  };

  handleSubmitthree = event => {
    event.preventDefault();
    this.setState({
      levelNumber: parseInt(event.target[0].value),
      challengeNumber: parseInt(event.target[1].value)
    });
    return;
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitFour = e => {
    e.preventDefault();
    if (
      this.state.levelNumber >= 1 &&
      this.state.levelNumber <= 10 &&
      this.state.challengeNumber > 0
    ) {
      this.setState({
        isValidSelection: true
      });
    }
  };

  render() {
    if (this.state.showLeaderboard === true) {
      if (this.state.isValidSelection) {
        return (
          <Leaderboard
            id={this.id}
            challengeNumber={this.state.challengeNumber}
            levelNumber={this.state.levelNumber}
          />
        );
      } else {
        return (
          <div className="container mt-4 mb-4">
            <h2>Select Your Options</h2>
            <form className="form mt-4" onSubmit={this.handleSubmitFour}>
              <div className="form-group">
                <label for="levelNumber">
                  <h5>
                    Enter the level at which you want to see leaderboard :{" "}
                  </h5>
                </label>
                <input
                  type="number"
                  name="levelNumber"
                  min="1"
                  max="10"
                  step="1"
                  className="ml-2"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="challengeNumber">
                  <h5>
                    Enter the challenge number you want to see leaderboard :{" "}
                  </h5>
                </label>
                <input
                  type="number"
                  name="challengeNumber"
                  min="1"
                  step="1"
                  className="ml-2"
                  onChange={this.handleChange}
                />
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-3">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block ml-2"
                    value="Show"
                  />
                </div>
              </div>
            </form>
          </div>
        );
      }
    } else if (this.state.level !== -1 && this.state.challenge === -1) {
      return <Addquestion level={this.state.level} />;
    } else if (this.state.level !== -1 && this.state.challenge !== -1) {
      return (
        <Editquestion
          challengeNumber={this.state.challenge}
          level={this.state.level}
          id={this.id}
        />
      );
    } else if (this.state.show_add_challenge === true) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter the level to which you want to add the challenge :{" "}
            <input type="text" />
          </label>
          <br />
          <label>
            Add
            <input type="submit" value="Submit" />
          </label>
        </form>
      );
    } else if (this.state.show_edit_challenge === true) {
      return (
        <form onSubmit={this.handleSubmittwo}>
          <label>
            Enter the level at which you want to edit the challenge :{" "}
            <input type="text" />
          </label>
          <br />
          <label>
            Enter the challenge number you want to edit the challenge :{" "}
            <input type="text" />
          </label>
          <br />
          <label>
            Edit
            <input type="submit" value="Submit" />
          </label>
        </form>
      );
    } else if (this.state.showlogin === true) {
      return <Login />;
    } else {
      return (
        <div className="container">
          <button onClick={this.add_challenge}>Add Challenge</button>
          <br />
          <button onClick={this.edit_challenge}>Edit Challenge</button>
          <br />
          <button onClick={this.logout}>Logout</button>
          <br />
          <button onClick={this.show_leaderboard}>Show leaderboard</button>
        </div>
      );
    }
  }
}

export default ProfessorDashboard;
