import React, {useState} from 'react';
import Avatar from '../Avatar/Avatar';
import './TitleBar.css';

const TitleBar = (props) => {
	const {onMenuClick, menuOpen} = props;
	const user = {
		name: "Rishab",
		img: null,
	};
	
	const [pathName, setPathName] = useState(window.location.pathname);
	
	
	return (
		<div className="title-bar">
			<div className="hamburgur-menu-icon" onClick={() => onMenuClick()} >
				{menuOpen ? (
					<span class="material-icons-round">close</span>
				) : (
					<span class="material-icons-round">menu</span>
				)}
			</div>
			<div className="title">
				{pathName === "/tasks" && <h4>Tasks</h4>}
				{pathName === "/" && <h4>Dashboard</h4>}
			</div>
			<div className="user">
				<Avatar user={user} size="40"></Avatar>
			</div>
		</div>
	);
}
 
export default TitleBar;