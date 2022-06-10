import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaQuery, { useMediaQuery } from "react-responsive";
import moment from "moment";
import Button from "../../components/Button/Button";
import CheckBox from "../../components/CheckBox/CheckBox";
import { alert } from "../../components/CustomAlert/alert";
import CustomDatePicker from "../../components/DatePicker/DatePicker";
import DropDownSearch from "../../components/DropDownSearch/DropDownSearch";
import Tag from "../../components/Tag/Tag";

import { createTask, closeAddTaskForm, updateTask } from "../../store/actions/taskAction";

import "./AddTask.css";

const AddTask = ({ task }) => {
	
	const projects = useSelector((state) => state.project.projects);
	const teams = useSelector((state) => state.team.teams);
	const users = useSelector((state) => state.user.users);
	const taskToBeUpdated = useSelector(state => state.task.taskToBeUpdated);
	if (taskToBeUpdated) {
		task = taskToBeUpdated;
	}

	const userOptions = [];
	const teamOptions = [];
	const projectOptions = [];

	users.forEach((user) => {
		user.val = user.id;
		userOptions.push(user);
	});
	teams.forEach((team) => {
		team.val = team.id;
		teamOptions.push(team);
	});
	projects.forEach((project) => {
		project.val = project._id;
		projectOptions.push(project);
	});
	
	const defaultAssignedTo = task?.assignedTo.map((user) => user.id);
	const defaultTeam = task?.team?.id || null;
	const defaultProject = task?.project?._id || null;

	const [title, setTitle] = useState(task ? task.title : "");
	const [description, setDescription] = useState(
		task ? task.description || "" : ""
	);
	const [assignedToUsers, setAssignedToUsers] = useState(
		task ? defaultAssignedTo || [] : []
	);
	const [assignedToTeam, setAssignedToTeam] = useState(
		task ? defaultTeam || null : null
	);
	const [project, setProject] = useState(
		task ? defaultProject || null : null
	);

	const [subTasks, setsubTasks] = useState(task ? task.subTasks || [] : []);
	const [subTaskTitle, setSubTaskTitle] = useState("");
	const [subTaskDescription, setSubTaskDescription] = useState("");
	const [endDate, setEndDate] = useState(
		new Date(task?.endDate || Date.now()) || new Date()
	);
	const [tags, setTags] = useState(task ? task.tags || [] : []);
	const [currentTag, setCurrentTag] = useState("");
	const [reminder, setReminder] = useState(task ? task.reminder || false : false);
	const [noSubTasksWarning, setNoSubTasksWarning] = useState(0);

	const dispatch = useDispatch();

	const handleAddSubTask = () => {
		if (subTaskTitle.length > 0) {
			setsubTasks([
				...subTasks,
				{ title: subTaskTitle, description: subTaskDescription },
			]);
			setSubTaskTitle("");
			setSubTaskDescription("");
		} else {
			alert({ message: "Title cannot be empty", type: "error" });
		}
	};
	const editSubTask = (val, i, type) => {
		const subTasksCopy = [...subTasks];
		if (type === "title") {
			subTasksCopy[i].title = val;
		} else {
			subTasksCopy[i].description = val;
		}

		setsubTasks(subTasksCopy);
	};
	const handleRemoveTag = (i) => {
		const tagsCopy = [...tags];
		tagsCopy.splice(i, 1);
		setTags(tagsCopy);
	};
	const handleAddTag = (e) => {
		if (e.key === "Enter" && currentTag.length > 0) {
			setTags([...tags, e.target.value]);
			setCurrentTag("");
		}
	};
	const handleSubmit = () => {
		if (title.length === 0) {
			return alert({
				message: "TASK: Title can't be empty",
				type: "error",
			});
		}
		if (!endDate) {
			return alert({
				message: "TASK: Invalid End date",
				type: "error",
			});
		}
		if (assignedToUsers.length === 0 && assignedToTeam.length === 0) {
			console.log(assignedToUsers);
			return alert({
				message: "TASK: Task must be assigned to someone",
				type: "error",
			});
		}
		if (tags.length === 0) {
			return alert({
				message: "TASK: Please add some tags to Task",
				type: "error",
			});
		}
		if (subTasks.length === 0 && noSubTasksWarning === 0) {
			setNoSubTasksWarning(1);
			return alert({
				message: "TASK: You have not created any sub tasks",
				type: "warning",
			});
		}
		console.log(subTasks);
		const newTaskBody = {
			title,
			description,
			team: assignedToTeam,
			assignedTo: assignedToUsers,
			project,
			endDate,
			tags,
			reminder,
			subTasks,
			// image: demoImg
		};

		console.log(newTaskBody);
		if(task) 
			dispatch(updateTask(task.id, newTaskBody));
		else
			dispatch(createTask(newTaskBody));
	};
	const handleRemoveSubTask = (i) => {
		console.log("CLICK");
		const subTasksCopy = [...subTasks];
		subTasksCopy.splice(i, 1);
		setsubTasks(subTasksCopy);
	};
	const handleCloseAddTaskForm = () => {
		dispatch(closeAddTaskForm());
	};

	const isSmallScreen = useMediaQuery({
		query: "(max-device-width: 480px)",
	});
	const isLargeScreen = useMediaQuery({
		query: "(min-device-width: 1025px)",
	});
	const isMediumScreen = !isSmallScreen && !isLargeScreen;


	return (
		<div className="add-task-form">
			{isSmallScreen && (
				<header>
					<div className="title">Add Task</div>
					<span
						class="material-icons-round"
						onClick={handleCloseAddTaskForm}
					>
						close
					</span>
				</header>
			)}
			<form action="javascript:void(0)">
				<div className="left-form">
					<label htmlFor="title" className="form-item">
						<p>Title</p>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<label htmlFor="description" className="form-item">
						<p>Description</p>
						<textarea
							placeholder="Description"
							id="description"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</label>
					<label className="form-item sub-tasks">
						<p>Sub Tasks:</p>
						<div className="sub-task-list">
							{subTasks.map((subTask, i) => (
								<div className="sub-task-container">
									<p className="">Sub task {i + 1}: </p>
									<div className="sub-task">
										<input
											type="text"
											placeholder="Title"
											value={subTask.title}
											onInput={(e) =>
												editSubTask(
													e.target.value,
													i,
													"title"
												)
											}
										/>
										<textarea
											type="text"
											placeholder="Description"
											value={subTask.description}
											onInput={(e) =>
												editSubTask(
													e.target.value,
													i,
													"description"
												)
											}
										/>
									</div>
									<span
										class="material-icons-round"
										onClick={() => handleRemoveSubTask(i)}
									>
										close
									</span>
								</div>
							))}
							<div className="sub-task-container new-sub-task">
								<p>New Sub task: </p>
								<div className="sub-task">
									<input
										type="text"
										placeholder="Title"
										value={subTaskTitle}
										onInput={(e) =>
											setSubTaskTitle(e.target.value)
										}
									/>
									<textarea
										type="text"
										placeholder="Description"
										value={subTaskDescription}
										onInput={(e) =>
											setSubTaskDescription(
												e.target.value
											)
										}
									/>
								</div>
							</div>
						</div>
						<Button
							type="button"
							buttonType="tertiary"
							innerText="Add sub task"
							onClick={() => handleAddSubTask()}
						></Button>
					</label>
					<label className="form-item upload-img">
						<p>Images:</p>
						<input
							type="file"
							accept="image/png, image/jpg, image/jpeg, image/webp"
						/>
					</label>
				</div>
				<div className="right-form">
					<label htmlFor="endDate">
						<p>End Date:</p>
						<CustomDatePicker
							value={endDate}
							onChange={setEndDate}
						></CustomDatePicker>
					</label>
					<label htmlFor="">
						<p>Assigned To Users</p>
						<DropDownSearch
							multiple={true}
							defaultSelected={assignedToUsers}
							options={userOptions}
							onSelectItem={(val) => setAssignedToUsers(val)}
							placeholder="Search for Users"
						></DropDownSearch>
					</label>
					<label htmlFor="">
						<p>Assigned To Team</p>
						<DropDownSearch
							defaultSelected={assignedToTeam}
							multiple={false}
							options={teamOptions}
							onSelectItem={(val) => setAssignedToTeam(val)}
							placeholder="Search for Team"
						></DropDownSearch>
					</label>
					<label htmlFor="">
						<p>Add a Project</p>
						<DropDownSearch
							defaultSelected={project}
							multiple={false}
							options={projectOptions}
							onSelectItem={(val) => setProject(val)}
							placeholder="Search for Project"
						></DropDownSearch>
					</label>
					<label htmlFor="" className="form-item">
						<p>Tags:</p>
						<input
							type="text"
							placeholder="Add Tags. Press Enter after every Tag"
							onKeyDown={(e) => handleAddTag(e)}
							value={currentTag}
							onChange={(e) => setCurrentTag(e.target.value)}
						/>
						<div className="tags-list">
							{tags.map((tag, i) => (
								<Tag
									type="dimmed"
									tag={tag}
									innerHtml={
										<>
											<p>{tag}</p>
											<span
												class="material-icons-round"
												onClick={() =>
													handleRemoveTag(i)
												}
											>
												close
											</span>
										</>
									}
								></Tag>
							))}
						</div>
					</label>
					<label className="horizontal">
						<CheckBox
							initialChecked={reminder}
							onCheck={() => setReminder(true)}
						></CheckBox>
						<p>Reminder?</p>
					</label>
					<div className="action-btns">
						<Button
							type="button"
							buttonType=""
							innerText="Cancel"
							onClick={handleCloseAddTaskForm}
						></Button>
						<Button
							type="button"
							buttonType="primary"
							innerText="Save"
							onClick={handleSubmit}
						></Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddTask;
