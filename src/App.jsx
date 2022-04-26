import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
	return (
		<Router>
			<Navbar></Navbar>
			<div className="main-container">
				<Menu></Menu>
				<div className="main-body"></div>
			</div>
		</Router>
	);
}

export default App;
