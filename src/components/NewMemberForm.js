import React, { Component } from 'react';
import axios from 'axios';
const year = new Date().getFullYear();
class NewMemberForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
      firstName: "",
      lastName: "",
      programs: "",
      email: "",
      officeDate: "",
      officeTimeStart: "",
      officeTimeEnd: "",
      majors: "",
      minors: "",
      country: "",
      inductionSemester: "",
      inductionSeason: "",
      inductionYear: "",
      graduationSemester: "",
      graduationSeason: "",
      graduationYear: "",
      birthday: "",
      firstLast: "",
      questions: ["","","","",""],
      image:"",
    }
  }

	//sends form data to db to create new member
    _createMember = () => {
        var majorArray = this.state.majors.split(',');
        var minorArray = this.state.minors.split(',');
        var officeStart = this.state.officeTimeStart;
        var officeEnd = this.state.officeTimeEnd;
        var birthdayFormatted;
        if (this.state.officeTimeStart.substring(0,2) > 12) {
            officeEnd = this.state.officeTimeStart.substring(0,2)-12 + this.state.officeTimeStart.substring(2);
        }
        if (this.state.officeTimeStart.substring(0,1) == 0) {
            officeStart = this.state.officeTimeStart.substring(1);
        }

        if (this.state.officeTimeEnd.substring(0,2) > 12) {
            officeEnd = this.state.officeTimeEnd.substring(0,2)-12 + this.state.officeTimeEnd.substring(2);
        }
        if (this.state.officeTimeEnd.substring(0,1) == 0) {
            officeEnd = this.state.officeTimeEnd.substring(1);
        }

        birthdayFormatted = this.state.birthday.substring(5,7) + "/"+ this.state.birthday.substring(8)
        if (birthdayFormatted.substring(0,1) == 0) {
            birthdayFormatted = birthdayFormatted.substring(1);
        }
        if (birthdayFormatted.substring(birthdayFormatted.length-2,birthdayFormatted.length-1) == 0) {
            birthdayFormatted = birthdayFormatted.substring(0,birthdayFormatted.length-2)+birthdayFormatted.substring(birthdayFormatted.length-1);
        }
        axios.post("/api/member/createMember", {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            programs: this.state.programs,
            majors: this.state.majors,
            minors: this.state.minors,
            email: this.state.email,
            officeHours: this.state.officeDate+" "+officeStart+" - "+officeEnd,
            firstLast: this.state.firstName+this.state.lastName,
            isAdmin: false,
            isExecutive: false,
            eventAttendedbyID: [],
            isActive: true,
            points: 0,
            inducted: this.state.inductionSeason+this.state.inductionYear.substring(2),
            graduationSemester: this.state.graduationSeason+this.state.graduationYear.substring(2),
            yearsLeft: this.state.graduationYear-year,
            birthday: birthdayFormatted,
            questions: this.state.questions,
            country: this.state.country,
            image: this.state.image,
        });
    }
    yearDropdown = () => {
        return (
            Array.from( new Array(5), (v,i) =>
                <option key={i} value={year+i}>{year+i}</option>
            )
        );
    };

	_isFormFilled = () => {
		const bool = this.state.firstName !== 0 &&
		this.state.lastName !== "" &&
		this.state.programs !== "" &&
		this.state.email !== "" &&
		this.state.officeDate !== "" &&
        this.state.officeTimeStart !== "" &&
        this.state.officeTimeEnd !== "" &&
        this.state.majors !== "" &&
        this.state.country !== "" &&
        this.state.inductionSeason !== "" &&
        this.state.inductionYear !== "" &&
        this.state.graduationSeason !== "" &&
        this.state.graduationYear !== "";
		return (
			bool
		);
	}
	render() {	
		return (
			<div style={this.props.isFormOpen ? {} : {display: "none"}} className="event-modal">
				<form>
					<label htmlFor="firstName">First Name: </label>
					<input type="text" id="firstName" required onChange={(e) => this.setState({firstName: e.target.value})}/>
					<label htmlFor="lastName"> Last Name: </label >
					<input type="text" id="lastName" required onChange={(e) => this.setState({lastName: e.target.value})}/>
					<br/>
					
					<label htmlFor="programs">Programs: </label>
					<input type="text" id="programs" required onChange={(e) => this.setState({programs: e.target.value})}/>
                    <label htmlFor="email">Email: </label>
					<input type="text" id="email" required onChange={(e) => this.setState({email: e.target.value})}/>
					<br/>

                    Office Hours:
                    <br/>
                    <label htmlFor="officeDate">Select Day: </label>
                    <select name=" officeDate" required onChange={(e) => this.setState({officeDate: e.target.value})}>
                        <option value="" selected>Select Office Hour Date</option>
						<option value="Monday">Monday</option>
						<option value="Tuesday">Tuesday</option>
						<option value="Wednesday">Wendesday</option>
						<option value="Thursday">Thursday</option>
						<option value="Friday">Friday</option>
					</select>
                    <label htmlFor="officeTimeStart">Start Time: </label>
					<input type="time" id="officeTimeStart" required onChange={(e) => this.setState({officeTimeStart: e.target.value})}/>
                    <label htmlFor="officeTimeEnd">End Time: </label>
					<input type="time" id="officeTimeEnd" required onChange={(e) => this.setState({officeTimeEnd: e.target.value})}/>
                    <br/>

					<label htmlFor="majors">Majors: </label>
					<input type="text" id="majors" placeholder="separate majors with ," required onChange={(e) => this.setState({majors: e.target.value})}/>
					<label htmlFor="minors">Minors: </label>
					<input type="text" id="minors" placeholder="separate minors with ,"onChange={(e) => this.setState({minors: e.target.value})}/>
                    <br/>

                    <label htmlFor="country">Countries: </label>
					<input type="text" id="country" required onChange={(e) => this.setState({country: e.target.value})}/>
					<br/>

                    <label htmlFor="inductionSemesterSeason" >Induction Semester: </label>
					<select name="inductionSemesterSeason" required onChange={(e) => this.setState({inductionSeason: e.target.value})}>
                        <option value="" selected>Select Induction Semester</option>
                        <option value="SP">Spring</option>
						<option value="FA">Fall</option>
					</select>
                    <label htmlFor="inductionSemesterYear">Induction Year: </label>
					<select name="inductionSemesterYear" required onChange={(e) => this.setState({inductionYear: e.target.value})}><option value="" selected>Select Induction Year</option>{this.yearDropdown()}</select>
                    <br/>
                    
                    <label htmlFor="graduationSemesterSeason">Graduation Semester: </label>
					<select name="graduationSemesterSeason" required onChange={(e) => this.setState({graduationSeason: e.target.value})}>
                        <option value="" selected>Select Graduation Semester</option>
                        <option value="SP">Spring</option>
						<option value="FA">Fall</option>
					</select>
                    <label htmlFor="graduationSemesterYear">Graduation Year: </label>
					<select name="graduationSemesterYear" required onChange={(e) => this.setState({graduationYear: e.target.value})}><option value="" selected>Select Graduation Year</option>{this.yearDropdown()}</select>
                    <br/>

                    <label htmlFor="birthday">Birthday: </label>
					<input type="date" id="birthday" onChange={(e) => this.setState({birthday: e.target.value})}/>
					<br/>

                    <button onClick={this._isFormFilled() ? this._createMember: null} className="manage-btn">Create New Member</button>
				</form>
			</div>
		);
	}
}

export default NewMemberForm;