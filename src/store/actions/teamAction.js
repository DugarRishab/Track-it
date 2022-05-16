import * as api from "../../api/api.js";
import { alert } from "../../components/CustomAlert/alert";

export const getUserTeams = () => async (dispatch) => {
	try {
		const res = await api.getUserTeams();
		dispatch({ type: "GET_USER_TEAMS", payload: res.data.data });
	} catch (err) {
		alert({ message: err.response.data.message, type: "error" });
		console.log(err);
	}
};
