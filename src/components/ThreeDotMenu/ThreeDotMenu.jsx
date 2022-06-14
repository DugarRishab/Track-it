import React, { useState, useEffect, useRef } from "react";
import "./ThreeDotMenu.css";

const ThreeDotMenu = ({ options, position }) => {
	// position: bottom-left || bottom-right || top-left || left-right
	const [menuOpen, setMenuOpen] = useState(false);
	const handleOpenMenu = () => {
		setMenuOpen(!menuOpen);
	};
	let style;
	const ref = useRef();
	switch (position) {
		case "bottom-left":
			style = {
				right: 0,
				top: "30px",
			};
			break;
		case "bottom-right":
			style = {
				left: 0,
				top: "30px",
			};
			break;
		case "top-right":
			style = {
				left: 0,
				bottom: "30px",
			};
			break;
		case "top-left":
			style = {
				right: 0,
				bottom: "30px",
			};
			break;
		default:
			style = {
				left: 0,
				top: "30px",
			};
	}
	const handleOptionClick = (option) => {
		setMenuOpen(false);
		option.onClick();
	};
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (menuOpen && ref.current && !ref.current.contains(e.target)) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [menuOpen]);

	return (
		<div className="three-dot-menu-container" ref={ref}>
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
							onClick={() => handleOptionClick(option)}
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
