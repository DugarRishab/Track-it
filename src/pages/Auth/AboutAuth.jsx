import React, { Component } from "react";
import logo from '../../res/img/logo.png';
class AboutAuth extends Component {
	state = {};
	render() {
		return (
			<div className="about-auth">
				<img src={logo} alt="" />
				<h1 className="heading">Join the Track-it community</h1>
				<ul className="features">
					<li>Manage all your tasks in one place</li>
					<li>Create teams for more efficient task distribution</li>
					<li>Manage all your projects</li>
					<li>Use chat for more efficient communication between team members</li>
				</ul>
				<div className="sub-text">
					Collaborate and share knowledge with a private group for
					FREE.
					<div className="link">
						Get Track-it for Teams free for up to 50 users.
					</div>
				</div>
			</div>
		);
	}
}

export default AboutAuth;
