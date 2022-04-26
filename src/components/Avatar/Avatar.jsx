import React, { Component } from 'react';
import './Avatar.css';

class Avatar extends Component {
	state = {  } 
	render() { 
		const { size } = this.props;
		const { img, name } = this.props.user;
		const style = {
			height: `${size}px`,
			width: `${size}px`
		} 
		const pStyle = {
			fontSize: size*0.5
		}
		return (
			<div className="avatar" style={style}>
				{img ? (
					<img src={img} alt="" />
				) : (
						<p style={pStyle}>{ name[0] }</p>
				)}
			</div>
		);
	}
}
 
export default Avatar;