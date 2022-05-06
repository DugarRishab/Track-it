import React, { Component } from "react";
import './InputText.css';

class InputText extends Component {
	state = {
		style: {},
	};
	render() {
		const { type, label, optionalInnerHtml, onChange, value } = this.props;
		const name = label.toLowerCase();
		return (
			<label htmlFor={name}>
				<h4>{label}</h4>
				{optionalInnerHtml}
				<input type={type} name={name} id={name} onChange={e => onChange(e)} value={value || null} />
			</label>
		);
	}
}

export default InputText;
