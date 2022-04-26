import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404/404";

import Tasks from "./pages/Tasks/Tasks";

const AllRoutes = () => {
	return (
		<Routes>
			<Route exact path="/tasks" element={<Tasks></Tasks>}></Route>
			<Route path="/*" element={<NotFound></NotFound>}></Route>
		</Routes>
	);
};

export default AllRoutes;
