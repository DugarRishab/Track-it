const initialState = {
	assignedByUserTasks: [],
	assignedToUserTasks: [],
	openAddTaskForm: false,
	updateTask: 0,
	taskToBeUpdated: null
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
			return { ...state };

		case "COMPLETE_TASK": {
			let assignedByUserTasks = [...state.assignedByUserTasks];
			let assignedToUserTasks = [...state.assignedToUserTasks];
			let index;
			// let updateTask = [...state.updateTask];

			for (let i = 0; i < assignedByUserTasks.length; i++) {
				if (assignedByUserTasks[i].id === action.payload.task.id) {
					index = i;
					// assignedByUserTasks.push(action.payload.task);
					localStorage.setItem(
						"updatedTask",
						JSON.stringify(action.payload.task)
					);
					assignedByUserTasks.splice(index, 1);

					break;
				}
			}
			for (let i = 0; i < assignedToUserTasks.length; i++) {
				if (assignedToUserTasks[i].id === action.payload.task.id) {
					index = i;
					// assignedToUserTasks.push(action.payload.task);
					localStorage.setItem(
						"updatedTask",
						JSON.stringify(action.payload.task)
					);
					assignedToUserTasks.splice(index, 1);

					break;
				}
			}

			return {
				...state,
				assignedByUserTasks,
				assignedToUserTasks,
				updateTask: true,
			};
		}
		case "UPDATE_TASK": {
			let assignedByUserTasks = [...state.assignedByUserTasks];
			let assignedToUserTasks = [...state.assignedToUserTasks];
			let index;
			// let updateTask = [...state.updateTask];

			for (let i = 0; i < assignedByUserTasks.length; i++) {
				if (assignedByUserTasks[i].id === action.payload.task.id) {
					index = i;
					// assignedByUserTasks.push(action.payload.task);
					localStorage.setItem(
						"updatedTask",
						JSON.stringify(action.payload.task)
					);
					assignedByUserTasks.splice(index, 1);

					break;
				}
			}
			for (let i = 0; i < assignedToUserTasks.length; i++) {
				if (assignedToUserTasks[i].id === action.payload.task.id) {
					index = i;
					// assignedToUserTasks.push(action.payload.task);
					localStorage.setItem(
						"updatedTask",
						JSON.stringify(action.payload.task)
					);
					assignedToUserTasks.splice(index, 1);

					break;
				}
			}

			return {
				...state,
				assignedByUserTasks,
				assignedToUserTasks,
				updateTask: true,
			};
		}

		case "SET_UPDATED_TASK": {
			// const task = localStorage.getItem("updatedTask");
			const assignedByUserTasks = [...state.assignedByUserTasks];
			const assignedToUserTasks = [...state.assignedToUserTasks];

			if (action.payload.type === "assignedTo") {
				assignedToUserTasks.splice(0, 0, action.payload.task);
				console.log("assignedTo");
			} else {
				assignedByUserTasks.splice(0, 0, action.payload.task);
				console.log("assignedBy");
			}
			return {
				...state,
				assignedByUserTasks,
				assignedToUserTasks,
				updateTask: false,
			};
		}

		case "OPEN_ADD_TASK_FORM":
			return { ...state, openAddTaskForm: true, taskToBeUpdated: action.payload?.task };
		case "CLOSE_ADD_TASK_FORM":
			return { ...state, openAddTaskForm: false, taskToBeUpdated: null};
		default:
			return state;
	}
}

export default taskReducer