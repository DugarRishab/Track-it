import React, { Component, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Navbar.css";
import logo from "../../res/img/logo.png";
import Button from "../Button/Button";
import userImage from '../../res/img/user1.jpg';
import Avatar from "../Avatar/Avatar";

const Navbar = () => {
	const notifications = 0;
	const user = {
		name: "Rishab",
		img: null
	}

	return (
		<nav className="navbar-container">
			<div className="nav-items">
				<Link exact="true" to="/" className="nav-logo nav-item">
					<img src={logo} alt="TRACK-IT" className="logo-img" />
				</Link>
				<NavLink exact="true" to="/" className="nav-item">
					Projects
				</NavLink>
				<NavLink exact="true" to="/tasks" className="nav-item">
					Tasks
				</NavLink>
				<form action="" className="nav-item search-bar">
					<input type="text" placeholder="Search..." />
					<span className="material-icons" width="18">
						search
					</span>
				</form>
				<NavLink
					exact="true"
					to="/notifications"
					className="nav-item noti"
				>
					<span
						className={`material-icons-two-tone ${
							notifications > 0 ? "active" : null
						}`}
						width="18"
					>
						{notifications > 0
							? "notifications_active"
							: "notifications"}
					</span>
				</NavLink>
				{/* <Link></Link> */}
				<Button
					className="nav-item"
					innerText="Add Task +"
					buttonType="primary"
				></Button>
			</div>
			<div className="nav-item">
				<div className="profile-tag">
					<div className="user">
						<div className="user-img">
							{/* <img src={userImage} alt="" /> */}
							<Avatar size="50" user={user}></Avatar>
						</div>
						<div className="user-info">
							<p className="name">Rishab Dugar</p>
							<p className="status">Have a nice day 👋</p>
						</div>
					</div>
					<span class="material-icons-two-tone dimmed">settings</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
