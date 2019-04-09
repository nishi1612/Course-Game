import React, { Component } from 'react';
import Login from './login';
import Addquestion from './addquestion';
import Editquestion from './editquestions';
import Leaderboard from './leaderboard';

class ProfessorDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show_login : false,
        show_add_challenge : false,
        show_edit_challenge : false,
        level : -1,
        challenge : -1,
        showLeaderboard : false,
        challengeNumber : -1,
        levelNumber : -1
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

    show_leaderboard(){
        this.setState({
            showLeaderboard : true
        });
        alert(this.state.showLeaderboard);
        return ;
    }

    logout(){
        this.setState({
            showlogin : true
        });
        return ;
    }

    add_challenge(){
        this.setState({
            show_add_challenge : true
        });
        return ;
    }

    edit_challenge(){
        this.setState({
            show_edit_challenge :true
        });
        return ;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            level : parseInt(event.target[0].value)
        });
        return;
    }

    handleSubmittwo = (event) => {
        event.preventDefault();
        this.setState({
            level : parseInt(event.target[0].value),
            challenge : parseInt(event.target[1].value)
        });
        return;
    }

    handleSubmitthree = (event) => {
        event.preventDefault();
        this.setState({
            levelNumber : parseInt(event.target[0].value),
            challengeNumber : parseInt(event.target[1].value)
        });
        return;
    }

    render() {
        if(this.state.challengeNumber !== -1 && this.state.levelNumber !== -1){
            return (<Leaderboard id={this.id} challengeNumber={this.state.challengeNumber} level={this.state.levelNumber}/>);
        }else if(this.state.showLeaderboard === true){
            return (<form onSubmit={this.handleSubmitthree}>
                    <label>Enter the level at which you want to see leaderboard : <input type="text"></input></label>
                    <br />
                    <label>Enter the challenge number you want to see leaderboard : <input type="text"></input></label>
                    <br />
                    <label>Show<input type="submit" value="Submit" /></label>
                 </form>
            );
        }else if(this.state.level !== -1 && this.state.challenge === -1){
            return (
                <Addquestion level={this.state.level} />
            );
       }else if(this.state.level !== -1 && this.state.challenge !== -1){
            return (
                <Editquestion challengeNumber={this.state.challenge} level={this.state.level} id={this.id}/>
            );
       }else if(this.state.show_add_challenge === true){
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>Enter the level to which you want to add the challenge : <input type="text"></input></label>
                    <br />
                    <label>Add<input type="submit" value="Submit" /></label>
                </form>
            );
       }else if(this.state.show_edit_challenge === true){
            return (
                <form onSubmit={this.handleSubmittwo}>
                    <label>Enter the level at which you want to edit the challenge : <input type="text"></input></label>
                    <br />
                    <label>Enter the challenge number you want to edit the challenge : <input type="text"></input></label>
                    <br />
                    <label>Edit<input type="submit" value="Submit" /></label>
                </form>
            );
       }else if(this.state.showlogin === true){
            return (
                <Login />
            );
        }else{
            return (
                <div className = "container">
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
