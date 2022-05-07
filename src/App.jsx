import React, { Component, useEffect, useState} from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import MediaQuery from "react-responsive";
import AllRoutes from "./Routes";
import "./App.css";
import "./components/CustomAlert/CustomAlert.css";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import TitleBar from "./components/TitleBar/TitleBar";
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu";


const App = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const handleMenuOpen = () => {
		setMenuOpen(!menuOpen);
	};
	// const [pathName, setPPathName] = useState(window.location.pathname);
	let mainBodyStyle = {
		marginLeft : "0px"
	}
	// // useEffect(() => {
	// // 	setPPathName(window.location.pathname);
	// // }, []);
	// useEffect(() => {
	// 	console.log("menu closing");
	// 	setMenuOpen(false);	
	// }, [pathName]);

	if (menuOpen) {
		mainBodyStyle.marginLeft = "250px"
	}
	return (
		<Router>
			<MediaQuery minWidth={1025}>
				<Navbar></Navbar>
			</MediaQuery>
			
			<MediaQuery maxWidth={1024}>
				<TitleBar
					onMenuClick={handleMenuOpen}
					menuOpen={menuOpen}
				></TitleBar>
			</MediaQuery>
			<div className="main-container">
				<MediaQuery minWidth={1025}>
					<Menu></Menu>
				</MediaQuery>

				{
					<MediaQuery maxWidth={1024}>
						<div className="main-body-container">
							<HamburgerMenu open={menuOpen} onMenuClick={handleMenuOpen}></HamburgerMenu>
							<div className="main-body" style={mainBodyStyle}>
								<AllRoutes></AllRoutes>
							</div>
						</div>
					</MediaQuery>
				}
				{
					<MediaQuery minWidth={1025}>
						<div className="main-body">
							<AllRoutes></AllRoutes>
						</div>
					</MediaQuery>
				}
			</div>
		</Router>
	);
};

export default App;
