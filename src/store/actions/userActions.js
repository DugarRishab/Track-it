import * as api from "../../api/api.js";
import { alert } from "../../components/CustomAlert/alert";

export const getUserUsers = () => async (dispatch) => {
	try {
		const res = await api.getUserUsers();
		dispatch({ type: "GET_USER_USERS", payload: res.data.data });
	} catch (err) {
		alert({ message: err.response.data.message, type: "error" });
		console.log(err);
	}
}