import React, { Component } from 'react';
import Show from './show';
import Login from './login';
import Idscoreboard from './idscoreboard';

class StudentDashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show_challenge : false,
        show_scoreboard : false,
        show_login : false,
        show_review : false
      };
      this.id = props.id;
      this.level = props.level;
      this.showChallenges = this.showChallenges.bind(this);
      this.showScoreboard = this.showScoreboard.bind(this);
      this.logout = this.logout.bind(this);
    }

    showScoreboard(){
        this.setState({
            show_scoreboard : true
        });
        return ;
    }

    showChallenges(){
        this.setState({
            show_challenge : true
          });
        return;
    }

    logout(){
        this.setState({
            show_login : true
        });
        return ;
    }

    render() {
        if(this.state.show_challenge === true){
            return ( <Show level={this.level} id={this.id}/> );
        }else if(this.state.show_scoreboard === true){
            return (
                <Idscoreboard id={this.id} level={this.level}/>
            );
        }else if(this.state.showl_ogin === true){
            return (
                <Login />
            );
        }else if(this.state.show_review === true){
            return ;
        }else{
            return (
                <div className = "container">
                    <button onClick={this.showScoreboard}>Show scoreboard</button>
                    <br />
                    <button onClick={this.showChallenges}>Show challenges</button>
                    <br />
                    <button onClick={this.logout}>Logout</button>
                </div>
            );
        }
    }
  }
  
  export default StudentDashboard;
