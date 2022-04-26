import React from 'react';
import "./Tasks.css";


const InfoCard = (props) => {
	const { title, number, color } = props;
	return ( 
		<div className={`info-card ${color}`} >
			<div className="title">{ title }</div>
			<div className="contents">
				<div className="vertical-line"></div>
				<h1>{ number }</h1>
				<p>Tasks</p>
			</div>
		</div>
	);
}
 
export default InfoCard;