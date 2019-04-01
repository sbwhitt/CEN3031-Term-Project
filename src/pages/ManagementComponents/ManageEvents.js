import React, { Component } from 'react';
import Modal from '../HelperComponents/Modal.js';

class ManageEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEventsOpen:false
		}
	}
	render() {
		let ManageEvents = (
			<div>
				<h1 className="page-text">Events</h1>
				<hr className="page-divider"/>
				<div style={{marginLeft: "5%"}}>
					<button onClick = {(e) => this.setState({isOpen: true})} className="event-button"> create a new event </button>
					<Modal isOpen = {this.state.isOpen} onClose={(e) => this.setState({isOpen: false})}/>
				</div>
				<p className="page-text">Event Management</p>
			</div>
		)
		
		if (!this.props.isEventsOpen) {
			ManageEvents = null;
		}
		
		return (
			<div>
				{ManageEvents}
			</div>
		);
	}
}

export default ManageEvents;