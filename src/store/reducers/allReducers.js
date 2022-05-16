import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";
import userReducer from './userReducer';
import teamReducer from "./teamReducer";

export default combineReducers({
	auth: authReducer,
	task: taskReducer,
	user: userReducer,
	project: projectReducer,
	team: teamReducer,
});
