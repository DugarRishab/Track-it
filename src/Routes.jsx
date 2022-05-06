import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404/404";
import Auth from "./pages/Auth/Auth";
import NoUser from "./pages/NoUser/NoUser";

import Tasks from "./pages/Tasks/Tasks";

const AllRoutes = () => {
	// const user = {
	// 	name: "Rishab",
	// 	img: null
	// }
	const user = null;
	return (
		<Routes>
			<Route
				exact
				path="/tasks"
				element={user ? <Tasks></Tasks> : <NoUser></NoUser>}
			></Route>
			<Route
				exact
				path="/auth"
				element={<Auth></Auth>}
			></Route>
			<Route path="/*" element={<NotFound></NotFound>}></Route>
		</Routes>
	);
};

export default AllRoutes;
