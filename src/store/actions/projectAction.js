import * as api from "../../api/api.js";
import { alert } from "../../components/CustomAlert/alert";

export const getUserProjects = () =>async (dispatch) => {
	try {
		const res = await api.getUserProjects();
		dispatch({ type: "GET_USER_PROJECTS", payload: res.data.data });
	} catch (err) {
		alert({ message: err.response.data.message, type: "error" });
		console.log(err);
	}
};
