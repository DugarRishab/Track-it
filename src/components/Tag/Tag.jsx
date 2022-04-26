import React from 'react';
import './Tag.css';

const Tag = (props) => {
	const { innerHtml, tag, color, type } = props;
	return ( 
		<div className={`tag ${type} ${color}`} key={tag}>{ innerHtml }</div>
	);
}
 
export default Tag;