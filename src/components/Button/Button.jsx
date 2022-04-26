import React, { Component } from 'react';
import './Button.css';


const Button = (props) => {
	const { innerText, buttonType, type, onClick, disabled } = props;
	const handleClick = () => {
		
	}
	return !disabled ? (
			<button
				className={`btn btn--${buttonType}`}
				type={type}
				onClick={() => onClick() || handleClick()}
			>
				{innerText}
			</button>
		) : (
			<button
				className={`btn btn--${buttonType} disabled`}
				type={type}
				
			>
				{innerText}
			</button>
		);
}
 
export default Button;