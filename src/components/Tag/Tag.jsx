import React from 'react';
import './Tag.css';

const Tag = (props) => {
	const { innerHtml, tag, color, type, borderRadius, minWidth } = props;
	const style = {
		borderRadius: borderRadius || '25px',
		minWidth: minWidth || 'none',
	}

	return ( 
		<div className={`tag ${type} ${color}`} key={tag} style={style}>{ innerHtml } </div>
	);
}
 
export default Tag;