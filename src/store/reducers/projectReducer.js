const initialState = {
	projects: [],
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_USER_PROJECTS":
			return { ...state, projects: action.payload.projects };
		default:
			return { ...state };
	}
};

export default projectReducer;