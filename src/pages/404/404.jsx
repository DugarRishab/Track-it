import React from 'react';
import img from '../../res/img/illustrations/404.jpg';
import './404.css';

const NotFound = () => {
	return (
		<div className="not-found-page">
			<img src={img} alt="" className="not-found" />
		</div>
	);
}
 
export default NotFound;