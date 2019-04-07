import React, { Component } from 'react';
import firebase from './Firebase';
import ProfessorDashboard from './professorDashboard';
import Login from './login';

function ShowQuestion(props){
    const q = props.q;
    const t = props.t;
    const o0 = props.o0;
    const o1 = props.o1;
    const o2 = props.o2;
    const a = props.a;
    const j = props.j;
    if(t===0){
      return ( 
      <div>
        <label>Question {j}<input type="text" placeholder={q}></input></label>
        <hr/>
        <label>Answer {j}<input placeholder={a}></input></label>
        <hr />        
      </div> );
    }else if(t===2){
      return(
        <div>
          <label>Question {j}<input placeholder={q}></input></label>
            <hr/>
            <label>Answer {j}<input placeholder={a}></input></label>
            <hr />  
        </div>
      );
    }
    return (
      <div>
        <label>Question {j}<input placeholder={q} ></input></label>
        <hr/>
        <label>Answer {j}<input placeholder={a}></input></label>
        <hr />
        <label>Option 1 <input name={j} placeholder={o0} ></input></label>
        <label>Option 2 <input name={j} placeholder={o1} ></input></label>
        <label>Option 3 <input name={j} placeholder={o2} ></input></label>
        <hr />
      </div>
    ); 
  }

class Editquestion extends Component {
    constructor(props) {
      super(props);
      this.ref = firebase.collection('challenge');
      this.unsubscribe = null;
      this.state = {
        questions : [],
        found : false,
        show_prof_dashboard : false,
        show_login : false
      };
      this.level = props.level;
      this.id = "0";
      this.get_id = props.id;
      this.challengeNumber = props.challengeNumber;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.prof_dashboard = this.prof_dashboard.bind(this);
      this.logout = this.logout.bind(this);
    }
  
    pushinarray(q,a,t,data,questions,j){
        if(t===1){
          var o0,o1,o2;
            if(j===0){
              var {d0_1,d0_2,d0_3} = data;
              o0=d0_1;
              o1=d0_2;
              o2=d0_3;
            }else if(j===1){
              var {d1_1,d1_2,d1_3} = data;
              o0=d1_1;
              o1=d1_2;
              o2=d1_3;
            }else if(j===2){
              var {d2_1,d2_2,d2_3} = data;
              o0=d2_1;
              o1=d2_2;
              o2=d2_3;
            }else if(j===3){
              var {d3_1,d3_2,d3_3} = data;
              o0=d3_1;
              o1=d3_2;
              o2=d3_3;
            }else if(j===4){
              var {d4_1,d4_3,d4_2} = data;
              o0=d4_1;
              o1=d4_2;
              o2=d4_3;
            }else if(j===5){
              var {d5_1,d5_3,d5_2} = data;
              o0=d5_1;
              o1=d5_2;
              o2=d5_3;
            }else if(j===6){
              var {d6_1,d6_3,d6_2} = data;
              o0=d6_1;
              o1=d6_2;
              o2=d6_3;
            }else if(j===7){
              var {d7_1,d7_3,d7_2} = data;
              o0=d7_1;
              o1=d7_2;
              o2=d7_3;
            }else if(j===8){
              var {d8_1,d8_3,d8_2} = data;
              o0=d8_1;
              o1=d8_2;
              o2=d8_3;
            }else if(j===9){
              var {d9_1,d9_3,d9_2} = data;
              o0=d9_1;
              o1=d9_2;
              o2=d9_3;
            }
            questions.push({q,t,a,o0,o1,o2,j});
        }else if(t===2){
            var o0 = 'True';
            var o1 = 'False';
            questions.push({q,t,a,o0,o1,j});
        }else{
            questions.push({q,t,a,j});
        }
      }

    onCollectionUpdate = (querySnapshot) => {
      var questions = [] ;
      querySnapshot.forEach((doc) => {
        var {level,challengeNumber} = doc.data();
        if(parseInt(level)===parseInt(this.level) && parseInt(challengeNumber)===parseInt(this.challengeNumber)){
            var {q1,q2,q3,q0,q4,q5,q6,q7,q8,q9,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,t0,t1,t2,t3,t4,t5,t6,t7,t8,t9} = doc.data();
            this.pushinarray(q0,a0,t0,doc.data(),questions,0);
            this.pushinarray(q1,a1,t1,doc.data(),questions,1);
            this.pushinarray(q2,a2,t2,doc.data(),questions,2);
            this.pushinarray(q3,a3,t3,doc.data(),questions,3);
            this.pushinarray(q4,a4,t4,doc.data(),questions,4);
            this.pushinarray(q5,a5,t5,doc.data(),questions,5);
            this.pushinarray(q6,a6,t6,doc.data(),questions,6);
            this.pushinarray(q7,a7,t7,doc.data(),questions,7);
            this.pushinarray(q8,a8,t8,doc.data(),questions,8);
            this.pushinarray(q9,a9,t9,doc.data(),questions,9);
            this.id = doc.id;
            this.setState({
              found : true
            });
        }
      });
      this.setState({
        questions
     });
    }
  
    componentDidMount() {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    handleSubmit = (event) => {
      event.preventDefault();
      firebase.settings({
        timestampsInSnapshots: true
      });
      firebase.collection("challenge").doc(this.id).delete();
      var values = [];
      for(var i=0;i<50;i++){
          if(event.target[i].value === ""){
              values.push(event.target[i].placeholder);
          }else{
              values.push(event.target[i].value);
          }
        }
      // Checking that one of the options is the answer.
      for(var i=0;i<50;){
        var a = values[i+2].toLowerCase() === values[i+1].toLowerCase();        
        var b = values[i+3].toLowerCase() === values[i+1].toLowerCase();
        var c = values[i+4].toLowerCase() === values[i+1].toLowerCase();
        if(a || b || c){
          var t = "Everything okay"
        }else{
          var j = i/5 + 1;
          j = parseInt(j);
          alert("There is a mismatch found at " + j + " question");
          return ;
        }
        i = i+5;
      }

     const userRef = firebase.collection("challenge").add({
        level: this.level,
        challengeNumber : this.challengeNumber,
        q0 : values[0],
        a0 : values[1],
        d0_1 : values[2],
        d0_2 : values[3],
        d0_3 : values[4],
        q1 : values[5],
        a1 : values[6],
        d1_1 : values[7],
        d1_2 : values[8],
        d1_3 : values[9],
        q2 : values[10],
        a2 : values[11],
        d2_1 : values[12],
        d2_2 : values[13],
        d2_3 : values[14],
        q3 : values[15],
        a3 : values[16],
        d3_1 : values[17],
        d3_2 : values[18],
        d3_3 : values[19],
        q4 : values[20],
        a4 : values[21],
        d4_1 : values[22],
        d4_2 : values[23],
        d4_3 : values[24],
        q5 : values[25],
        a5 : values[26],
        d5_1 : values[27],
        d5_2 : values[28],
        d5_3 : values[29],
        q6 : values[30],
        a6 : values[31],
        d6_1 : values[32],
        d6_2 : values[33],
        d6_3 : values[34],
        q7 : values[35],
        a7 : values[36],
        d7_1 : values[37],
        d7_2 : values[38],
        d7_3 : values[39],
        q8 : values[40],
        a8 : values[41],
        d8_1 : values[42],
        d8_2 : values[43],
        d8_3 : values[44],
        q9 : values[45],
        a9 : values[46],
        d9_1 : values[47],
        d9_2 : values[48],
        d9_3 : values[49],
        t0:1,
        t1:1,
        t2:1,
        t3:1,
        t4:1,
        t5:1,
        t6:1,
        t7:1,
        t8:1,
        t9:1
      });  
    }

    prof_dashboard(){
      this.setState({
        show_prof_dashboard : true
      });
      return ;
    }

    logout(){
      this.setState({
        show_login : true
      });
      return ;
    }

    render() {
      if(this.state.show_login === true){
        return (
          <Login />
        );
      }else if(this.state.show_prof_dashboard === true){
        return (
          <ProfessorDashboard id={this.get_id} />
        );
      }else if(this.state.found===false){
        return (
          <div>
            Sorry we could not find such a challenge belonging to level {this.level} and having challenge number {this.challengeNumber}.
            <br />
            <button onClick={this.show_prof_dashboard}>Professor Dashboard</button>
          </div>
        );
      }else{
        return (
          <div className="container">
          <div className = "panel">
            <button onClick={this.prof_dashboard}>Professor Dashboard</button>
            <br />
            <button onClick={this.logout}>Logout</button>
            <br />
            <form onSubmit={this.handleSubmit}>
            {this.state.questions.map(question =>
              <div><ShowQuestion a={question.a} q={question.q} t={question.t} o0={question.o0} o1={question.o1} o2={question.o2} j={question.j}
              /></div>
                )}
                <input type="submit"></input>
            </form>
            </div>
          </div>
        );
      }
    }
  }
  
  export default Editquestion;
