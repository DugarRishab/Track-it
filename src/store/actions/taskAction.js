import * as api from "../../api/api.js";
import { alert } from "../../components/CustomAlert/alert";

export const getUserTasks = () => async (dispatch) => {
	try {
		const res = await api.getUserTasks();
		dispatch({ type: "GET_USER_TASKS", payload: res.data.data });
	}
	catch (err) {
		alert({ message: err.message, type: "error" });
		console.log(err);
	}
}