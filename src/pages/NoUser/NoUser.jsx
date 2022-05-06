import React from 'react';
import './NoUser.css';
import waitingIllustration from '../../res/img/illustrations/waiting.jpg';
import Button from '../../components/Button/Button';
import { NavLink } from 'react-router-dom';

const NoUser = () => {
	const user = null;
	return (
		<div className="no-user-page">
			{/* <img src={waitingIllustration} alt=""></img> */}
			<div className="redirect-container">
				<div className="redirect">
					<h1 className='header'>Please Login to get back on track</h1>
					<NavLink exact to={"/auth"}>
						<Button
							innerText="Login"
							buttonType="primary"
							onClick={null}
						></Button>
					</NavLink>
				</div>
			</div>
		</div>
	);
}
 
export default NoUser;