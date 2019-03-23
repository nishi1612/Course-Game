import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';

function ShowQuestion(props){
  const q = props.q;
  const t = props.t;
  if(t==0){
    return ( 
    <div>
      <par>{q}</par>
      <br />
      <input type="text"></input>
    </div> );
  }else if(t==1){
    return(
      <div>
        <par>{q}</par>
        <br />
      <label>True <input type="radio"></input></label>
      <label>False <input type="radio"></input></label>
      </div>
    );
  }
  return (
    <div>

    </div>
  ); 
}

class Showchallenge extends Component {
    constructor(props) {
      super(props);
      this.ref = firebase.collection('challenge');
      this.unsubscribe = null;
      this.state = {
        questions: []
      };
    }

    pushinarray(q,a,t,data,questions,j){
      if(t==1){
        var o0,o1,o2;
          if(j==0){
            var {d1_1,d1_0,d1_2} = data;
            o0=d1_0;
            o1=d1_1;
            o2=d1_2;
          }else if(j==1){
            var {d1_1,d1_0,d1_2} = data;
            o0=d1_0;
            o1=d1_1;
            o2=d1_2;
          }else if(j==2){
            var {d2_1,d2_0,d2_2} = data;
            o0=d2_0;
            o1=d2_1;
            o2=d2_2;
          }else if(j==3){
            var {d3_1,d3_0,d3_2} = data;
            o0=d3_0;
            o1=d3_1;
            o2=d3_2;
          }else if(j==4){
            var {d4_1,d4_0,d4_2} = data;
            o0=d4_0;
            o1=d4_1;
            o2=d4_2;
          }else if(j==5){
            var {d5_1,d5_0,d5_2} = data;
            o0=d5_0;
            o1=d5_1;
            o2=d5_2;
          }else if(j==6){
            var {d6_1,d6_0,d6_2} = data;
            o0=d6_0;
            o1=d6_1;
            o2=d6_2;
          }else if(j==7){
            var {d7_1,d7_0,d7_2} = data;
            o0=d7_0;
            o1=d7_1;
            o2=d7_2;
          }else if(j==8){
            var {d8_1,d8_0,d8_2} = data;
            o0=d8_0;
            o1=d8_1;
            o2=d8_2;
          }else if(j==9){
            var {d9_1,d9_0,d9_2} = data;
            o0=d9_0;
            o1=d9_1;
            o2=d9_2;
          }
          questions.push({q,t,a,o0,o1,o2});
      }else if(t==2){
          var o0 = 'True';
          var o1 = 'False';
          questions.push({q,t,a,o0,o1});
      }else{
          questions.push({q,t,a});
      }
    }
  
    onCollectionUpdate = (querySnapshot) => {
      const questions = [];
      querySnapshot.forEach((doc) => {
        var {challengeNumber,q1,q2,q3,q0,q4,q5,q6,q7,q8,q9,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,t0,t1,t2,t3,t4,t5,t6,t7,t8,t9} = doc.data();
        if(challengeNumber==this.props.match.params.id){
          this.pushinarray(q0,a0,t0,doc.data(),questions);
          this.pushinarray(q1,a1,t1,doc.data(),questions);
          this.pushinarray(q2,a2,t2,doc.data(),questions);
          this.pushinarray(q3,a3,t3,doc.data(),questions);
          this.pushinarray(q4,a4,t4,doc.data(),questions);
          this.pushinarray(q5,a5,t5,doc.data(),questions);
          this.pushinarray(q6,a6,t6,doc.data(),questions);
          this.pushinarray(q7,a7,t7,doc.data(),questions);
          this.pushinarray(q8,a8,t8,doc.data(),questions);
          this.pushinarray(q9,a9,t9,doc.data(),questions);
        }
        
      });
      this.setState({
        questions
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
            {this.state.questions.map(question =>
            <div><ShowQuestion q={question.q} t={question.t}/></div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Showchallenge;