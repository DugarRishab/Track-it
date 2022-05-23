import React, { useState } from "react";
import "./ThreeDotMenu.css";

const ThreeDotMenu = ({ options, position }) => {
	// position: bottom-left || bottom-right || top-left || left-right
	const [menuOpen, setMenuOpen] = useState(false);
	const handleOpenMenu = () => {
		setMenuOpen(!menuOpen);
	};
	let style;
	switch (position) {
		case "bottom-left":
			style = {
				right: 0,
				top: '30px',
			};
			break;
		case "bottom-right":
			style = {
				left: 0,
				top: '30px',
			};
			break;
		case "top-right":
			style = {
				left: 0,
				bottom: '30px',
			};
			break;
		case "top-left":
			style = {
				right: 0,
				bottom: '30px',
			};
			break;
		default:
			style = {
				left: 0,
				top: '30px',
			};
	}

	return (
		<div className="three-dot-menu-container">
			<div className="menu-btn">
				<span class="material-icons-round" onClick={handleOpenMenu}>
					more_horiz
				</span>
			</div>
			{menuOpen ? (
				<div className="menu-options" style={style}>
					{options.map((option) => (
						<div
							className="option"
							onClick={() => option.onClick()}
						>
							{option.title}
						</div>
					))}
				</div>
			) : null}
		</div>
	);
};

export default ThreeDotMenu;
