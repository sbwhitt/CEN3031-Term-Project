import React, { Component } from 'react';
import axios from 'axios';

const year = new Date().getFullYear();
class ProfileEditForm extends Component {
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
      inductionSeason: "",
      inductionYear: "",
      graduationSeason: "",
      graduationYear: "",
      birthday: "",
      firstLast: "",
      image: "",
    }
  }

  componentWillReceiveProps(props, state) {
    var odate = props.currentMember.officeHours.substring(0, props.currentMember.officeHours.indexOf("y") + 1)
    var ostart = props.currentMember.officeHours.substring(props.currentMember.officeHours.indexOf("y") + 2, props.currentMember.officeHours.indexOf("-") - 1);
    var oend = props.currentMember.officeHours.substring(props.currentMember.officeHours.indexOf("-") + 2);
    var month = props.currentMember.birthday.substring(0, props.currentMember.birthday.indexOf("/"));
    var day = props.currentMember.birthday.substring(props.currentMember.birthday.indexOf("/") + 1);

    if (ostart.substring(0, ostart.indexOf(':')) < 7) {
      var buffer = parseInt(ostart) + 12;
      ostart = buffer + ostart.substring(1);
    }
    if (oend.substring(0, oend.indexOf(':')) < 7) {
      var buffer = parseInt(oend) + 12;
      oend = buffer + oend.substring(1);
    }
    if (ostart.length < 5)
      ostart = "0" + ostart;
    if (oend.length < 5)
      oend = "0" + oend;
    if (month.length == 1)
      month = 0 + month;
    if (day.length == 1)
      day = 0 + day;

    this.setState({
      firstName: props.currentMember.firstName,
      lastName: props.currentMember.lastName,
      programs: props.currentMember.programs,
      email: props.currentMember.email,
      officeDate: odate,
      officeTimeStart: ostart,
      officeTimeEnd: oend,
      majors: props.currentMember.majors.join(","),
      minors: props.currentMember.minors.join(","),
      country: props.currentMember.country,
      inductionSeason: props.currentMember.inducted.substring(0, 2),
      inductionYear: 20 + props.currentMember.inducted.substring(2),
      graduationSeason: props.currentMember.graduationSemester.substring(0, 2),
      graduationYear: 20 + props.currentMember.graduationSemester.substring(2),
      birthday: year + "-" + month + "-" + day,
      image: props.currentMember.image,
    });
  }

  _updateProfile = () => {
    console.log(this.props.currentMember);
    var majorArray = this.state.majors.split(',');
    var minorArray = this.state.minors.split(',');
    var officeStart = this.state.officeTimeStart;
    var officeEnd = this.state.officeTimeEnd;
    var officehour;
    var birthdayFormatted = this.state.birthday;
    if (this.state.officeTimeStart.substring(0, 2) > 12) {
      officeEnd = this.state.officeTimeStart.substring(0, 2) - 12 + this.state.officeTimeStart.substring(2);
    }
    if (this.state.officeTimeStart.substring(0, 1) == 0) {
      officeStart = this.state.officeTimeStart.substring(1);
    }

    if (this.state.officeTimeEnd.substring(0, 2) > 12) {
      officeEnd = this.state.officeTimeEnd.substring(0, 2) - 12 + this.state.officeTimeEnd.substring(2);
    }
    if (this.state.officeTimeEnd.substring(0, 1) == 0) {
      officeEnd = this.state.officeTimeEnd.substring(1);
    }

    if (this.state.officeDate == "" || this.state.officeStart == "" || this.state.officeEnd == "") {
      officehour = "N/A";
    }
    else {
      officehour = this.state.officeDate + " " + officeStart + " - " + officeEnd
    }

    if (this.state.birthday !== "")
      birthdayFormatted = this.state.birthday.substring(5, 7) + "/" + this.state.birthday.substring(8)
    if (birthdayFormatted.substring(0, 1) == 0) {
      birthdayFormatted = birthdayFormatted.substring(1);
    }
    if (birthdayFormatted.substring(birthdayFormatted.length - 2, birthdayFormatted.length - 1) == 0) {
      birthdayFormatted = birthdayFormatted.substring(0, birthdayFormatted.length - 2) + birthdayFormatted.substring(birthdayFormatted.length - 1);
    }
    axios.post("/api/member/updateMember", {
      id: this.props.currentMember._id,
      update: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        programs: this.state.programs,
        majors: majorArray,
        minors: minorArray,
        email: this.state.email,
        officeHours: officehour,
        firstLast: this.state.firstName + this.state.lastName,
        inducted: this.state.inductionSeason + this.state.inductionYear.substring(2),
        graduationSemester: this.state.graduationSeason + this.state.graduationYear.substring(2),
        yearsLeft: this.state.graduationYear - year,
        birthday: birthdayFormatted,
        questions: this.state.questions,
        country: this.state.country,
        image: this.state.image,
      }
    });
  }

  yearDropdown = () => {
    return (
      Array.from(new Array(10), (v, i) =>
        <option key={i} value={year + i - 5}>{year + i - 5}</option>
      )
    );
  };

  render() {
    return (
      <div style={this.props.isFormOpen ? {} : { display: "none" }} className="event-modal">
        <form onSubmit={this._updateProfile}>
          <label htmlFor="firstName">First Name: </label>
          <input value={this.state.firstName} type="text" id="firstName" required onChange={(e) => this.setState({ firstName: e.target.value })} />
          <label htmlFor="lastName"> Last Name: </label >
          <input value={this.state.lastName} type="text" id="lastName" required onChange={(e) => this.setState({ lastName: e.target.value })} />
          <br />

          <label htmlFor="programs">Programs: </label>
          <input value={this.state.programs} type="text" id="programs" required onChange={(e) => this.setState({ programs: e.target.value })} />
          <label htmlFor="email">Email: </label>
          <input value={this.state.email} type="text" id="email" required onChange={(e) => this.setState({ email: e.target.value })} />
          <br />

          Office Hours:
            <br />
          <label htmlFor="officeDate">Select Day: </label>
          <select value={this.state.officeDate} name=" officeDate" required onChange={(e) => this.setState({ officeDate: e.target.value })}>
            <option value="" selected>Select Office Hour Date</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wendesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
          <label htmlFor="officeTimeStart">Start Time: </label>
          <input value={this.state.officeTimeStart} type="time" id="officeTimeStart" required onChange={(e) => this.setState({ officeTimeStart: e.target.value })} />
          <label htmlFor="officeTimeEnd">End Time: </label>
          <input value={this.state.officeTimeEnd} type="time" id="officeTimeEnd" required onChange={(e) => this.setState({ officeTimeEnd: e.target.value })} />
          <br />

          <label htmlFor="majors">Majors: </label>
          <input value={this.state.majors} type="text" id="majors" required onChange={(e) => this.setState({ majors: e.target.value })} />
          <label htmlFor="minors">Minors: </label>
          <input value={this.state.minors} type="text" id="minors" onChange={(e) => this.setState({ minors: e.target.value })} />
          <br />

          <label htmlFor="country">Countries: </label>
          <input value={this.state.country} type="text" id="country" required onChange={(e) => this.setState({ country: e.target.value })} />
          <br />

          <label htmlFor="inductionSemesterSeason" >Induction Semester: </label>
          <select value={this.state.inductionSeason} name="inductionSemesterSeason" required onChange={(e) => this.setState({ inductionSeason: e.target.value })}>
            <option value="" selected>Select Induction Semester</option>
            <option value="SP">Spring</option>
            <option value="FA">Fall</option>
          </select>
          <label htmlFor="inductionSemesterYear">Induction Year: </label>
          <select value={this.state.inductionYear} name="inductionSemesterYear" required onChange={(e) => this.setState({ inductionYear: e.target.value })}><option value="" selected>Select Induction Year</option>{this.yearDropdown()}</select>
          <br />

          <label htmlFor="graduationSemesterSeason">Graduation Semester: </label>
          <select value={this.state.graduationSeason} name="graduationSemesterSeason" required onChange={(e) => this.setState({ graduationSeason: e.target.value })}>
            <option value="" selected>Select Graduation Semester</option>
            <option value="SP">Spring</option>
            <option value="FA">Fall</option>
          </select>
          <label htmlFor="graduationSemesterYear">Graduation Year: </label>
          <select value={this.state.graduationYear} name="graduationSemesterYear" required onChange={(e) => this.setState({ graduationYear: e.target.value })}><option value="" selected>Select Graduation Year</option>{this.yearDropdown()}</select>
          <br />

          <label htmlFor="birthday">Birthday: </label>
          <input value={this.state.birthday} type="date" id="birthday" onChange={(e) => this.setState({ birthday: e.target.value })} />
          <br />
          <label htmlFor="image">image link: </label>
          <input value={this.state.image} type="text" id="image" onChange={(e) => this.setState({ image: e.target.value })} />
          <br />
          <input type="submit" onClick={this._updateProfile} className="manage-btn" value="Update Profile" />
        </form>
      </div>
    );
  }
}

export default ProfileEditForm;