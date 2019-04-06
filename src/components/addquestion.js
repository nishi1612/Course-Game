import React, { Component } from 'react';
import firebase from './Firebase';

function Showques(props){
  const j = props.j;
  return (
    <div>
  <label>Question {j}<input type="text" name="question1" ></input></label>
  <hr />
  <label>Answer {j}<input type="text" name="question1" ></input></label>
  <hr />
  <label>Option 1<input type="text" name="question1" ></input></label>
  <label>Option 2<input type="text" name="question1" ></input></label>
  <label>Option 3<input type="text" name="question1" ></input></label>
  <hr /> 
  </div>
  );
}

class Addquestion extends Component {
    constructor(props) {
      super(props);
      this.ref = firebase.collection('challenge');
      this.unsubscribe = null;
      this.state = {
        challengeNumber : 0
      };
      this.level = props.level;
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    onCollectionUpdate = (querySnapshot) => {
      var challengeNumber = 0;
      querySnapshot.forEach((doc) => {
        var {level} = doc.data();
        if(level===this.level){
          challengeNumber = challengeNumber +1;
        }
      });
      this.setState({
        challengeNumber
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
      // Checking that one of the options is the answer.
      for(var i=0;i<50;){
        var a = event.target[i+2].value.toLowerCase() === event.target[i+1].value.toLowerCase();        
        var b = event.target[i+3].value.toLowerCase() === event.target[i+1].value.toLowerCase();
        var c = event.target[i+4].value.toLowerCase() === event.target[i+1].value.toLowerCase();
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
        challengeNumber : this.state.challengeNumber,
        q0 : event.target[0].value,
        a0 : event.target[1].value,
        d0_1 : event.target[2].value,
        d0_2 : event.target[3].value,
        d0_3 : event.target[4].value,
        q1 : event.target[5].value,
        a1 : event.target[6].value,
        d1_1 : event.target[7].value,
        d1_2 : event.target[8].value,
        d1_3 : event.target[9].value,
        q2 : event.target[10].value,
        a2 : event.target[11].value,
        d2_1 : event.target[12].value,
        d2_2 : event.target[13].value,
        d2_3 : event.target[14].value,
        q3 : event.target[15].value,
        a3 : event.target[16].value,
        d3_1 : event.target[17].value,
        d3_2 : event.target[18].value,
        d3_3 : event.target[19].value,
        q4 : event.target[20].value,
        a4 : event.target[21].value,
        d4_1 : event.target[22].value,
        d4_2 : event.target[23].value,
        d4_3 : event.target[24].value,
        q5 : event.target[25].value,
        a5 : event.target[26].value,
        d5_1 : event.target[27].value,
        d5_2 : event.target[28].value,
        d5_3 : event.target[29].value,
        q6 : event.target[30].value,
        a6 : event.target[31].value,
        d6_1 : event.target[32].value,
        d6_2 : event.target[33].value,
        d6_3 : event.target[34].value,
        q7 : event.target[35].value,
        a7 : event.target[36].value,
        d7_1 : event.target[37].value,
        d7_2 : event.target[38].value,
        d7_3 : event.target[39].value,
        q8 : event.target[40].value,
        a8 : event.target[41].value,
        d8_1 : event.target[42].value,
        d8_2 : event.target[43].value,
        d8_3 : event.target[44].value,
        q9 : event.target[45].value,
        a9 : event.target[46].value,
        d9_1 : event.target[47].value,
        d9_2 : event.target[48].value,
        d9_3 : event.target[49].value,
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

    render() {
      return (
        <div className="container">
        <div className = "panel">
          <form onSubmit={this.handleSubmit}>
          <hr />
          <par>{this.state.challengeNumber}</par>
          <hr />
          <Showques j={1}/>
          <Showques j={2}/>
          <Showques j={3}/>
          <Showques j={4}/>
          <Showques j={5}/>
          <Showques j={6}/>
          <Showques j={7}/>
          <Showques j={8}/>
          <Showques j={9}/>
          <Showques j={10}/>
          <label>Add<input type="submit" value="Submit" /></label>
          </form>
          </div>
        </div>
      );
    }
  }
  
  export default Addquestion;
