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
			return { ...state }
		
		case "COMPLETE_TASK":
			const assignedByUserTasks = [...state.assignedByUserTasks];
			const assignedToUserTasks = [...state.assignedToUserTasks];
			let index;
			

			for (let i = 0; i < assignedByUserTasks.length; i++){
				if ((assignedByUserTasks[i].id === action.payload.task.id)) {
					index = i;
					assignedByUserTasks.push(action.payload.task);
					assignedByUserTasks.splice(index, 1);
					
					break;
				}
			}
			for (let i = 0; i < assignedToUserTasks.length; i++){
				if ((assignedToUserTasks[i].id === action.payload.task.id)) {
					index = i;
					assignedToUserTasks.push(action.payload.task);
					assignedToUserTasks.splice(index, 1);
					
					break;
				}
			}
			// assignedToUserTasks.splice(index, 1);
			// assignedToUserTasks.push(action.payload.task);

			return { ...state, assignedByUserTasks, assignedToUserTasks };

		case "OPEN_ADD_TASK_FORM":
			return { ...state, openAddTaskForm: true };
		case "CLOSE_ADD_TASK_FORM":
			return { ...state, openAddTaskForm: false };

		default:
			return state;
	}
}

export default taskReducer