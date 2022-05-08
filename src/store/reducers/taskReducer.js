const initialState = {
	assignedByUserTasks: [],
	assignedToUserTasks: []
}

const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_USER_TASKS":
			localStorage.setItem('assignedToUserTasks', JSON.stringify({ ...action?.payload.assignedToUserTasks }));
			localStorage.setItem('assignedByUserTasks', JSON.stringify({ ...action?.payload.assignedByUserTasks }));
			return {
				...state,
				assignedByUserTasks: action.payload.assignedByUserTasks,
				assignedToUserTasks: action.payload.assignedToUserTasks,
			};
			
		default:
			return state
	}
}

export default taskReducer