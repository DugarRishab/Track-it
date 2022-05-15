import React from 'react';
import DatePicker from "react-date-picker";
import './DatePicker.css';

const CustomDatePicker = ({value, onChange}) => {
	return (
		<DatePicker
			onChange={onChange}
			value={value}
			calendarIcon={
				<span class="material-icons-round">edit_calendar</span>
			}
			clearIcon={<span class="material-icons-round">close</span>}
			calendarClassName="date-picker-calender"
			className="date-picker"
			tileClassName="tiles"
			nextLabel={<span class="material-icons-round">chevron_right</span>}
			next2Label={
				<span class="material-icons-round">
					keyboard_double_arrow_right
				</span>
			}
			prevLabel={<span class="material-icons-round">chevron_left</span>}
			prev2Label={
				<span class="material-icons-round">
					keyboard_double_arrow_left
				</span>
			}
			minDate={new Date(Date.now())}
			yearPlaceholder="yyyy"
			monthPlaceholder="mm"
			dayPlaceholder="dd"
			name="endDate"
		/>
	);
}
 
export default CustomDatePicker;