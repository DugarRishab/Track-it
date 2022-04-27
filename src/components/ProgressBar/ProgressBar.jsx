import React from 'react';
import './ProgressBar.css';
const ProgressBar = (props) => {
	const { progress } = props;
	const barStyle = {
		width: progress + '%'
	}
	const btnStyle = {
		left: progress + '%'
	}
	return ( 
		<div className='progressbar-container'>
			<div className="progress-btn" style={btnStyle}></div>
			<div className="progressbar">
				<div className="progress" style={barStyle}></div>
			</div>
		</div>
	);
}
 
export default ProgressBar;