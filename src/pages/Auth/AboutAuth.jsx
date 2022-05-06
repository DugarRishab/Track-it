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
					<li>Get unstuck — ask a question</li>
					<li>Unlock new privileges like voting and commenting</li>
					<li>Save your favorite tags, filters, and jobs</li>
					<li>Earn reputation and badges</li>
				</ul>
				<div className="sub-text">
					Collaborate and share knowledge with a private group for
					FREE.
					<div className="link">
						Get Doubt Overflow for Teams free for up to 50 users.
					</div>
				</div>
			</div>
		);
	}
}

export default AboutAuth;
