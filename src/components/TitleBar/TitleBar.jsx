import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, logout } from "../../store/actions/authAction";
import Button from "../Button/Button";
import Avatar from '../Avatar/Avatar';
import './TitleBar.css';
import { Link } from 'react-router-dom';

const TitleBar = (props) => {
	const {onMenuClick, menuOpen} = props;
	const user = useSelector((state) => state.auth.user);
	
	const [pathName, setPathName] = useState(window.location.pathname);
	
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
	}, [dispatch]);
	return (
		<div className="title-bar">
			
			<div className="hamburgur-menu-icon" onClick={() => onMenuClick()}>
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
			{user ? (
				<div className="user">
					<Avatar user={user} size="40"></Avatar>
				</div>
			) : (
				<Link to={"/auth"}>
					<Button
						buttonType="primary"
						color="pink"
						innerText="Login"
					></Button>
				</Link>
			)}
		</div>
	);
}
 
export default TitleBar;