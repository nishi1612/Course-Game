import React, { Component } from 'react';
import firebase from './Firebase';
import Login from './login';
import StudentDashboard from './studentDashboard';

function ShowQuestion(props){
  const q = props.q;
  const t = props.t;
  const o0 = props.o0;
  const o1 = props.o1;
  const o2 = props.o2;
  const j = props.j;
  if(t===0){
    return ( 
    <div>
      <par>{q}</par>
      <br />
      <input type="text" name={j}></input>
    </div> );
  }else if(t===2){
    return(
      <div>
        <par>{q}</par>
        <br />
      <label>True <input type="radio" name={j} value="True" ></input></label>
      <br/>
      <label>False <input type="radio" name={j} value="False" ></input></label>
      </div>
    );
  }
  return (
    <div>
      <par>{q}</par>
      <br/>
      <label>{o0} <input type="radio" name={j} value={o0} ></input></label>
      <br/>
      <label>{o1} <input type="radio" name={j} value={o1} ></input></label>
      <br/>
      <label>{o2} <input type="radio" name={j} value={o2} ></input></label>
    </div>
  ); 
}

class Showchallenge extends Component {
    constructor(props) {
      super(props);
      this.ref = firebase.collection('challenge');
      this.unsubscribe = null;
      this.state = {
        questions: [],
        showlogin : false,
        showdashboard : false
      };
      this.id = props.id;
      this.level = props.level;
      this.challengeNumber = props.challengeNumber;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.logout = this.logout.bind(this);
      this.show_dashboard = this.show_dashboard.bind(this);
    }

    show_dashboard(){
      this.setState({
        showdashboard : true
      });
      return ;
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
      const questions = [];
      querySnapshot.forEach((doc) => {
        var {challengeNumber,q1,q2,q3,q0,q4,q5,q6,q7,q8,q9,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,t0,t1,t2,t3,t4,t5,t6,t7,t8,t9} = doc.data();
        if(parseInt(challengeNumber)===parseInt(this.challengeNumber)){
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
      var score = 0;
      var correct = [];
      var k =0;
      for(var i=0;i<10;i++){
        if(this.state.questions[i].t===0){
          if(event.target[k].value.toLowerCase() ===this.state.questions[i].a.toLowerCase()){
            score = score + 1;
            correct.push(1);
          }else{
            correct.push(0);
          }
          k=k+1;
        }else if(this.state.questions[i].t===1){
          for(var j=k;j<k+3;j++){
            if(event.target[j].checked){
              if(event.target[j].value.toLowerCase() ===this.state.questions[i].a.toLowerCase()){
                score = score + 1;
                correct.push(1);
              }else{
                correct.push(0);
              }
            }
          }
          k=k+3;
        }else{
          for(var j=k;j<k+2;j++){
            if(event.target[j].checked){
              if(event.target[j].value.toLowerCase() ===this.state.questions[i].a.toLowerCase()){
                score = score + 1;
                correct.push(1);
              }else{
                correct.push(0);
              }
            }
          }
          k=k+2;
        }
      }
      var to_change = false;
      var doc_id = "";
      const hello = firebase.collection('scores').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          var {challengeNumber,id,level,marks,array} = doc.data();
          if(id === this.id && level===this.level && challengeNumber === this.challengeNumber){
            if(marks>score){
              score = marks;
              correct = array;
            }
            to_change=true;
            doc_id = doc.id;
          }
        });
      });
      if(to_change===true){
        firebase.collection("scores").doc(doc_id).delete();
      }
      const userRef = firebase.collection("scores").add({
        challengeNumber : this.challengeNumber,
        level : this.level,
        marks : score,
        id : this.id,
        array : correct
      });
      var to_be_done = 0;
      const hi = firebase.collection('level').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
        var {level,challenge} = doc.data();
        if(level===this.level){
          to_be_done = challenge;
        }
        });
      });
      var done = 0;
      const ab = firebase.collection('scores').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
        var {level,challenge,id} = doc.data();
        if(level===this.level && id===this.id){
          done = done + 1;
        }
        });
      });
      if(to_be_done === done){
        var hellos = false;;
        var doc_id_2;
        var new_level,new_email,new_name,new_password,new_student;
        firebase.collection('user').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
          var {id,level,email,name,password,student} = doc.data();
          if(id===this.id && hellos===false && student===true){
            doc_id_2 = doc.id;
            new_level = level + 1;
            new_email = email;
            new_name = name;
            new_password = password;
            hellos=true;
            new_student = student;
            firebase.collection('user').doc(doc_id_2).delete();
            const userRef = firebase.collection("user").add({
              id : this.id,
              password : new_password,
              level : new_level,
              email : new_email,
              student : new_student,
              name : new_name 
            });
          }
          });
        });
      }
      this.level = new_level;
      this.setState({
        show_dashboard : true
      });
    }

    logout(){
      this.setState({
        showlogin : true
      }); 
      return ;
    }

    render() {
      if(this.state.showlogin === true){
        return (<Login />);
      }else if(this.state.showdashboard === true){
        return ( 
        <StudentDashboard id={this.id} level={this.level} />
        );
      }else{
      return (
        <div className="container">
          <button onClick={this.logout}>Logout</button>
          <br />
          <button onClick={this.show_dashboard}>Show Dashboard</button>
          <br />
          <div className = "panel">
            <form onSubmit={this.handleSubmit}>
              {this.state.questions.map(question =>
              <div><ShowQuestion q={question.q} t={question.t} o0={question.o0} o1={question.o1} o2={question.o2} j={question.j}
              /></div>
                )}
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );
    }
  }
}
  
export default Showchallenge;
