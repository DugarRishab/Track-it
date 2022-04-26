import React from 'react';
import { Link, NavLink } from "react-router-dom";

import Avatar from '../Avatar/Avatar';
import './Menu.css';

const Menu = () => {
	const user = {
		name: "Rishab",
		img: null,
	};
	return (
		<div className="menu-container">
			<Link exact="true" to="/profile"></Link>
			<Avatar user={user} size="50"></Avatar>
			<div className="menu-items">
				<NavLink exact="true" to="/" className={"menu-item"}>
					<span class="material-icons-round dimmed">grid_view</span>
				</NavLink>
				<NavLink exact="true" to="/teams" className={"menu-item"}>
					<span class="material-icons-round dimmed">groups</span>
				</NavLink>
				<NavLink exact="true" to="/schedule" className={"menu-item"}>
					<span class="material-icons-round dimmed">watch_later</span>
				</NavLink>

				<NavLink exact="true" to="/chat" className={"menu-item"}>
					<span class="material-icons-round dimmed">chat</span>
				</NavLink>
			</div>
		</div>
	);
}
 
export default Menu;