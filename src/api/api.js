import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
	// baseURL: "https://doubt-overflow-api.herokuapp.com/api/v1",
	baseURL: "http://localhost:8000/api/v2",
});

export const login = (authData) => api.post("/users/login", authData);
export const signup = (authData) => api.post("/users/signup", authData);
export const logout = () => api.get("/users/logout");

export const getUserTasks = () => api.get("/tasks/");
export const createTasks = (taskBody) => api.post("/tasks/", taskBody);

export const getUserProjects = () => api.get("/projects");
export const getUserTeams = () => api.get("/teams");
export const getUserUsers = () => api.get("/users");