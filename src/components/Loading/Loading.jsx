import React, { Component } from 'react';
import './Loading.css';

const Loading = (props) => {
	const { type } = props;
	return (
		<div className={`loading-${type}`}>
			{type === "success" ? (
				<span className={`material-icons icon`}>download_done</span>
			) : (
				<span className={`material-icons icon`}>autorenew</span>
			)}
		</div>
	);
}
 
export default Loading;