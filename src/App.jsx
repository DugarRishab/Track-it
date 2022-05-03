import { BrowserRouter as Router } from "react-router-dom";
import MediaQuery from "react-responsive";
import AllRoutes from './Routes';
import "./App.css";
import Menu from "./components/Menu/Menu";
import Navbar from "./components/Navbar/Navbar";
import TitleBar from "./components/TitleBar/TitleBar";

const App = () => {
	return (
		<Router>
			<MediaQuery minWidth={1025}>
				<Navbar></Navbar>
			</MediaQuery>
			<MediaQuery maxWidth={1024}>
				<TitleBar></TitleBar>
			</MediaQuery>
			<div className="main-container">
				<MediaQuery minWidth={1025}>
					<Menu></Menu>
				</MediaQuery>

				<div className="main-body">
					<AllRoutes></AllRoutes>
				</div>
			</div>
		</Router>
	);
}

export default App;
