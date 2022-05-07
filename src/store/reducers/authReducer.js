const initialState = {
	user: null,
	loading: false,
	success: false
}
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_AUTH_SUCCESS':
			localStorage.setItem('Profile', JSON.stringify({ ...action?.payload.user }));
			return { ...state, user: action?.payload.user, loading: false, success: true };
		
		case 'SET_CURRENT_USER':
			return { ...state, user: action.payload.user };
		
		case 'SEND_AUTH_REQUEST':
			return { ...state, loading: true };
		
		case 'GET_AUTH_FAILURE':
			return { ...state, loading: false, success: false };
		
		case 'DELETE_AUTH':
			localStorage.setItem("Profile", null);
			return { ...state, user: null, loading: false, success: false };
		
		default:
			return state;
	}
}
export default authReducer;