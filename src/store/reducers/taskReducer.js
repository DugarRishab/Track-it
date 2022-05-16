const initialState = {
	assignedByUserTasks: [],
	assignedToUserTasks: [],
	openAddTaskForm: false,
}

const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_USER_TASKS":
			localStorage.setItem(
				"assignedToUserTasks",
				JSON.stringify({ ...action?.payload.assignedToUserTasks })
			);
			localStorage.setItem(
				"assignedByUserTasks",
				JSON.stringify({ ...action?.payload.assignedByUserTasks })
			);
			return {
				...state,
				assignedByUserTasks: action.payload.assignedByUserTasks,
				assignedToUserTasks: action.payload.assignedToUserTasks,
			};
		case "CREATE_TASK":
			return {...state}

		case "OPEN_ADD_TASK_FORM":
			return { ...state, openAddTaskForm: true };
		case "CLOSE_ADD_TASK_FORM":
			return { ...state, openAddTaskForm: false };

		default:
			return state;
	}
}

export default taskReducer