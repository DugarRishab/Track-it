const initialState = {
	users: []
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_USER_USERS":
			return { ...state, users: action.payload.users };
		default:
			return {...state}
	}
}

export default userReducer;