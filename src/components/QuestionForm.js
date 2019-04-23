import React, { Component } from 'react';
import axios from 'axios';

const questionArray = ["1. What did you study and why?", "2. Where else have you traveled (2+ weeks)?", "3. What was one of the biggest challenges you faced while abroad?", "4. Do you have any advice for students looking to study abroad?", "5. What was an interesting experience you had while abroad?"];

const year = new Date().getFullYear();

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questions: [],
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
    }
  }

  componentWillReceiveProps(props, state) {
    this.setState({
      questions: props.currentMember.questions,
    });
  }

  _updateProfile = () => {
    console.log(this.props.currentMember);

    if (this.state.question1==="")
        this.state.question1=this.state.questions[0]
    if (this.state.question2==="")
        this.state.question2=this.state.questions[1]
    if (this.state.question3==="")
        this.state.question3=this.state.questions[2]
    if (this.state.question4==="")
        this.state.question4=this.state.questions[3]
    if (this.state.question5==="")
        this.state.question5=this.state.questions[4]


    var buffer = [this.state.question1, this.state.question2, this.state.question3, this.state.question4, this.state.question5];
    axios.post("/api/member/updateMember", {
      id: this.props.currentMember._id,
      update: {
        questions: buffer,
      }
    });
  }
  render() {
    return (
      <div style={this.props.isFormOpen ? {} : { display: "none" }} className="event-modal">

        <form onSubmit={this._updateProfile}>

            <label htmlFor="question1">{questionArray[0]}</label>
            <br/>
            <textarea name = "Question1" id = "question1" rows="8" cols="115"
            onChange={(e) => this.setState({ question1: e.target.value })}>
            </textarea>
            
            <label htmlFor="question2">{questionArray[1]}</label>
            <br/>
            <textarea name = "Question2" id = "question2" rows="8" cols="115"
            onChange={(e) => this.setState({ question2: e.target.value })}>
            </textarea>

            <label htmlFor="question3">{questionArray[2]}</label>
            <br/>
            <textarea name = "Question3" id = "question3" rows="8" cols="115"
            onChange={(e) => this.setState({ question3: e.target.value })}>
            </textarea>

            <label htmlFor="question4">{questionArray[3]}</label>
            <br/>
            <textarea name = "Question4" id = "question4" rows="8" cols="115"
            onChange={(e) => this.setState({ question4: e.target.value })} >
            </textarea>

            <label htmlFor="question5">{questionArray[4]}</label>
            <br/>
            <textarea name = "Question5" id = "question5" rows="8" cols="115"
            onChange={(e) => this.setState({ question5: e.target.value })}>
            </textarea>
            <br/>
            <input type="submit" onClick={this._updateProfile} className="manage-btn" value="Update Answers" />
        </form>
      </div>
    );
  }
}

export default QuestionForm;