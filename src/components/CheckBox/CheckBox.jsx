import React, { useState } from "react";
import './CheckBox.css';

const CheckBox = ({ initialChecked, label, onCheck, type, disabled }) => {
	const [checked, setChecked] = useState(initialChecked);
	const handleClick = () => {
		setChecked(!checked);
		if(onCheck)
			onCheck(checked);
	}
	return (
		<div className="check-box">
			{checked ? (
				<span className={`material-icons-round check ${disabled?disabled:null} `}>check_box</span>
			) : (
				<span className={`material-icons-round uncheck ${disabled?disabled:null} `}>
						check_box_outline_blank
				</span>
			)}
			<input type="checkbox"  onClick={() => handleClick()}/>
		</div>
	);
};

export default CheckBox;
