import React, { useState, useEffect } from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import Avatar from "../../components/Avatar/Avatar";
import TaskCard from "../../components/TaskCard/TaskCard";
import Tag from "../../components/Tag/Tag";
import InfoCard from "./InfoCard";
import RightCarousel from "./RightCarousel";
import AddTask from "../AddTask/AddTask";
import "./Tasks.css";

import {
	getUserTasks,
	openAddTaskForm,
	closeAddTaskForm,
	completeTask,
	setUpdatedTask,
} from "../../store/actions/taskAction";
import { getUserProjects } from "../../store/actions/projectAction";
import { getUserTeams } from "../../store/actions/teamAction";
import { getUserUsers } from "../../store/actions/userActions";
import Button from "../../components/Button/Button";

const Tasks = () => {
	const currentUser = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const location = useLocation();
	const [activeCategory, setActiveCategory] = useState("assignedToMe");
	// const [addTaskOpen, setAddTaskOpen] = useState(false);
	const addTaskOpen = useSelector((state) => state.task.openAddTaskForm);

	useEffect(() => {
		const category =
			queryString.parse(location.search).category || "assignedToMe";
		setActiveCategory(category);
	}, [location]);

	const assignedByMeTasks = useSelector(
		(state) => state.task.assignedByUserTasks
	);
	const assignedToMeTasks = useSelector(
		(state) => state.task.assignedToUserTasks
	);
	const updateTask = useSelector((state) => state.task.updateTask);
	let tasks = [],
		BacklogTasks = [],
		inProgressTasks = [],
		doneTasks = [];

	if (activeCategory === "assignedToMe") {
		tasks = assignedToMeTasks;
	} else if (activeCategory === "assignedByMe") {
		tasks = assignedByMeTasks;
	}

	BacklogTasks = tasks.filter((task) => task.status === "due");
	inProgressTasks = tasks.filter((task) => task.status === "in-progress");
	doneTasks = tasks.filter((task) => task.status === "done");

	const handleOnComplete = (taskId) => {
		dispatch(completeTask(taskId));
	};

	useEffect(() => {
		const updatedTask = JSON.parse(localStorage.getItem("updatedTask"));

		if (updatedTask && updateTask) {
			let assignedTo = false;
			updatedTask.assignedTo.forEach((user) => {
				if (user.id === currentUser.id) {
					assignedTo = true;
				}
			});
			if (assignedTo) {
				dispatch(setUpdatedTask(updatedTask, "assignedTo"));
			}
			if (updatedTask.assignedBy.id === currentUser.id) {
				dispatch(setUpdatedTask(updatedTask, "assignedBy"));
			}
		}
	}, [updateTask, dispatch, currentUser]);

	const handleOnDelete = () => {};
	const handleOnEdit = (id) => {
		console.log(tasks.find((task) => task.id === id));
		dispatch(openAddTaskForm(tasks.find((task) => task.id === id)));
	};
	const handleAddTask = () => {
		!addTaskOpen && dispatch(openAddTaskForm());
		addTaskOpen && dispatch(closeAddTaskForm());
	}

	useEffect(() => {
		console.log("EFFECT CALLED");
		dispatch(getUserTasks());
		dispatch(getUserProjects());
		dispatch(getUserTeams());
		dispatch(getUserUsers());
	}, [dispatch]);

	const isSmallScreen = useMediaQuery({
		query: "(max-device-width: 480px)",
	});
	const isLargeScreen = useMediaQuery({
		query: "(min-device-width: 1025px)",
	});
	const isMediumScreen = !isSmallScreen && !isLargeScreen;

	return (
		<>
			<div className="task-page">
				{addTaskOpen ? (
					<div className="add-task-container">
						<AddTask></AddTask>
					</div>
				) : null}

				<div className="left-panel">
					{isSmallScreen && (
						<section className="search-container">
							<form action="" className="search-bar">
								<input type="text" placeholder="Search..." />
								<span className="material-icons" width="18">
									search
								</span>
							</form>
						</section>
					)}

					<section className="header">
						<div className="item">
							<header>Information</header>
							<div className="body">
								<InfoCard
									title="Backlog"
									number={BacklogTasks.length}
									color="yellow"
								></InfoCard>
								<InfoCard
									title="In Progress"
									number={inProgressTasks.length}
									color="pink"
								></InfoCard>
								<InfoCard
									title="Completed"
									number={doneTasks.length}
									color="green"
								></InfoCard>
							</div>
						</div>
						<div className="item">
							<header>Category Tasks</header>
							<div className="body">
								<Link
									to={`./?category=assignedByMe`}
									className={`category-links ${
										activeCategory === "assignedByMe"
											? "active"
											: null
									}`}
								>
									<InfoCard
										title="Assigned by me"
										number={assignedByMeTasks.length}
									></InfoCard>
								</Link>
								<Link
									to={`./?category=assignedToMe`}
									className={`category-links ${
										activeCategory === "assignedToMe"
											? "active"
											: null
									}`}
								>
									<InfoCard
										title="Assigned to me"
										number={assignedToMeTasks.length}
									></InfoCard>
								</Link>
							</div>
						</div>
					</section>
					<section className="all-tasks">
						<header>
							<div className="text">
								<div className="title">
									All My Tasks
									<span class="material-icons-round active">
										edit_note
									</span>
								</div>
								{isSmallScreen && (
									<Button
										type="button"
										buttonType="primary"
										innerText="Add Task"
										onClick={handleAddTask}
									></Button>
								)}
							</div>
							<div className="sub-text">
								Managing your tasks is easy with Task Management
							</div>
						</header>
						<div className="contents">
							<div className="panel">
								<Tag
									innerHtml={
										<>
											Backlog &nbsp;
											<Tag
												innerHtml={
													<p>{BacklogTasks.length}</p>
												}
												color="yellow"
												type="primary"
												minWidth="28px"
											></Tag>
										</>
									}
									color="yellow"
									type="secondary"
								></Tag>
								{BacklogTasks.map((task) => (
									<TaskCard
										task={task}
										handleOnComplete={handleOnComplete}
										handleOnEdit={(task) =>
											handleOnEdit(task)
										}
										handleOnDelete={handleOnDelete}
									></TaskCard>
								))}
							</div>
							<div className="panel">
								<Tag
									innerHtml={
										<>
											In Progress &nbsp;
											<Tag
												innerHtml={
													<p>
														{inProgressTasks.length}
													</p>
												}
												color="pink"
												type="primary"
												minWidth="28px"
											></Tag>
										</>
									}
									color="pink"
									type="secondary"
								></Tag>
								{inProgressTasks.map((task) => (
									<TaskCard
										task={task}
										handleOnComplete={handleOnComplete}
										handleOnEdit={(task) =>
											handleOnEdit(task)
										}
										handleOnDelete={handleOnDelete}
									></TaskCard>
								))}
							</div>
							<div className="panel">
								<Tag
									innerHtml={
										<>
											Done &nbsp;
											<Tag
												innerHtml={
													<p>{doneTasks.length}</p>
												}
												color="green"
												type="primary"
												minWidth="28px"
											></Tag>
										</>
									}
									color="green"
									type="secondary"
								></Tag>
								{doneTasks.map((task) => (
									<TaskCard
										task={task}
										handleOnComplete={handleOnComplete}
										handleOnEdit={(task) =>
											handleOnEdit(task)
										}
										handleOnDelete={handleOnDelete}
									></TaskCard>
								))}
							</div>
						</div>
					</section>
					<section></section>
				</div>
				<div className="right-panel">
					<section>
						<header>Tips</header>
						<RightCarousel></RightCarousel>
					</section>

					<section>
						<div className="title">Recent Activities</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default Tasks;
