import React, { Component, useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MediaQuery from "react-responsive";
import AllRoutes from "./Routes";
import "./App.css";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import TitleBar from "./components/TitleBar/TitleBar";
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu";

const App = () => {
	const [menuOpen, setMenuOpen] = useState(true);
	const handleMenuOpen = () => {
		setMenuOpen(!menuOpen);
	};
	let mainBodyStyle = {
		marginLeft : "0px"
	}
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
							<HamburgerMenu open={menuOpen}></HamburgerMenu>
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
