import * as api from "../../api/api.js";
import { alert } from "../../components/CustomAlert/alert";

export const getUserTasks = () => async (dispatch) => {
	try {
		const res = await api.getUserTasks();
		dispatch({ type: "GET_USER_TASKS", payload: res.data.data });
	}
	catch (err) {
		alert({ message: err.response.data.message, type: "error" });
		console.log(err);
	}
}
export const createTask = (taskBody) => async (dispatch) => {
	try {
		const res = await api.createTasks(taskBody);
		
		dispatch({ type: "CREATE_TASK", payload: res.data.data });
	}
	catch (err) {
		alert({ message: err.response.data.message, type: "error" });
		console.log(err);
	}
}
export const openAddTaskForm = () => (dispatch) => {
	dispatch({ type: "OPEN_ADD_TASK_FORM" });
}
export const closeAddTaskForm = () => (dispatch) => {
	dispatch({ type: "CLOSE_ADD_TASK_FORM" });
}