import React from 'react';
import { Link, NavLink } from "react-router-dom";

import Avatar from "../Avatar/Avatar";
import './HamburgerMenu.css';

const HamburgerMenu = ({ open }) => {
	let menuStyle = {
		left: "-250px"
	}
	const user = {
		name: "Rishab",
		img: null,
	};
	if (open) {
		menuStyle.left = "0"
	}
	return (
		<div className="hamburger-menu-container" style={menuStyle}>
			<div className="hamburger-menu">
				<div className="menu-items">
					<Link exact="true" to="/profile" className={"menu-item"}>
						<Avatar user={user} size="40"></Avatar>
						<h4>Rishab DUgar</h4>
					</Link>
					<h4 className='menu-title'>Menu</h4>
					<NavLink exact="true" to="/" className={"menu-item"}>
						<span class="material-icons-round dimmed">
							grid_view
						</span>
						Dashboard
					</NavLink>
					<NavLink exact to="/tasks" className={"menu-item"}>
						<span class="material-icons-round dimmed">task_alt</span>
						Tasks
					</NavLink>
					<NavLink exact to="/projects" className={"menu-item"}>
						<span class="material-icons-round dimmed">rocket_launch</span>
						Projects
					</NavLink>
					<NavLink exact="true" to="/teams" className={"menu-item"}>
						<span class="material-icons-round dimmed">groups</span>
						Groups
					</NavLink>
					<NavLink
						exact="true"
						to="/schedule"
						className={"menu-item"}
					>
						<span class="material-icons-round dimmed">
							watch_later
						</span>
						Schedule
					</NavLink>

					<NavLink exact="true" to="/chat" className={"menu-item"}>
						<span class="material-icons-round dimmed">chat</span>
						Chat
					</NavLink>
				</div>
			</div>
		</div>
	);
}
 
export default HamburgerMenu;