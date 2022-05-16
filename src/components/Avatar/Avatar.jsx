import React, { Component } from 'react';
import './Avatar.css';

class Avatar extends Component {
	state = {  } 
	render() { 
		const { size, color } = this.props;
		const { image, name } = this.props.user;
		const style = {
			height: `${size}px`,
			width: `${size}px`,
			minWidth: `${size}px`,
		}; 
		const pStyle = {
			fontSize: size*0.5
		}
		return (
			<div className={`avatar ${color}`} style={style}>
				{/* {!image ? (
					<img src={image} alt="" />
				) : (
						<p style={pStyle}>{ name[0] }</p>
				)} */}
				<p style={pStyle}>{name[0]}</p>
			</div>
		);
	}
}
 
export default Avatar;