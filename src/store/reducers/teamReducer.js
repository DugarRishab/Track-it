const initialState = {
	teams: [],
};

const teamReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_USER_TEAMS":
			return { ...state, teams: action.payload.teams };
		default:
			return { ...state };
	}
};

export default teamReducer;