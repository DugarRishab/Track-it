import React from 'react';
import "./Tasks.css";


const InfoCard = (props) => {
	const { title, number, color, active } = props;
	return ( 
		<div className={`info-card ${color} ${active ? "active": null}`} >
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