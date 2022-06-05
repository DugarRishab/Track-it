import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import CheckBox from "../../components/CheckBox/CheckBox";
import { alert } from "../../components/CustomAlert/alert";
import CustomDatePicker from "../../components/DatePicker/DatePicker";
import DropDownSearch from "../../components/DropDownSearch/DropDownSearch";
import Tag from "../../components/Tag/Tag";

import { createTask, closeAddTaskForm } from "../../store/actions/taskAction";

import "./AddTask.css";

const AddTask = () => {

	const projects = useSelector(state => state.project.projects);
	const teams = useSelector((state) => state.team.teams);
	const users = useSelector((state) => state.user.users);

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
	// console.log(teamOptions);
	// console.log(projectOptions);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [assignedToUsers, setAssignedToUsers] = useState([]);
	const [assignedToTeam, setAssignedToTeam] = useState(null);
	const [project, setProject] = useState(null);
	const [subTasks, setsubTasks] = useState([]);
	const [subTaskTitle, setSubTaskTitle] = useState("");
	const [subTaskDescription, setSubTaskDescription] = useState("");
	const [endDate, setEndDate] = useState(new Date());
	const [tags, setTags] = useState([]);
	const [currentTag, setCurrentTag] = useState("");
	const [reminder, setReminder] = useState(false);
	const [noSubTasksWarning, setNoSubTasksWarning] = useState(0);

	const dispatch = useDispatch();
	
	const handleAddSubTask = () => {
		if (subTaskTitle.length > 0) {
			setsubTasks([...subTasks, { title: subTaskTitle, description: subTaskDescription }]);
			setSubTaskTitle("");
			setSubTaskDescription("");
		}
		else {
			alert({ message: "Title cannot be empty", type: "error" });
		}
	}
	const editSubTask = (val, i, type) => {
		const subTasksCopy = [...subTasks];
		if (type === "title") {
			subTasksCopy[i].title = val;
		}
		else {
			subTasksCopy[i].description = val;
		}

		setsubTasks(subTasksCopy);
	}
	const handleRemoveTag = (i) => {
		const tagsCopy = [...tags];
		tagsCopy.splice(i, 1);
		setTags(tagsCopy);
	}
	const handleAddTag = (e) => {
		if (e.key === "Enter" && currentTag.length > 0) {
			setTags([...tags, e.target.value]);
			setCurrentTag("");
		}
	}
	const handleSubmit = () => {
		if (title.length === 0) {
			return alert({ message: "TASK: Title can't be empty", type: "error" });
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
		}

		console.log(newTaskBody);
		dispatch(createTask(newTaskBody));

	}
	const handleRemoveSubTask = (i) => {
		console.log("CLICK")
		const subTasksCopy = [...subTasks];
		subTasksCopy.splice(i, 1);
		setsubTasks(subTasksCopy);
	}
	const handleCloseAddTaskForm = () => {
		dispatch(closeAddTaskForm());
	}

	return (
		<div className="add-task-form">
			<form action="javascript:void(0)">
				<div className="left-form">
					<label htmlFor="title" className="form-item">
						<p>Title</p>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Title"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<label htmlFor="description" className="form-item">
						<p>Description</p>
						<textarea
							placeholder="Description"
							id="description"
							name="description"
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</label>
					<label className="form-item sub-tasks">
						<p>Sub Tasks:</p>
						<div className="sub-task-list">
							{subTasks.map((task, i) => (
								<div className="sub-task-container">
									<p className="">Sub task {i + 1}: </p>
									<div className="sub-task">
										<input
											type="text"
											placeholder="Title"
											value={task.title}
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
											value={task.description}
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
							options={userOptions}
							onSelectItem={(val) => setAssignedToUsers(val)}
							placeholder="Search for Users"
						></DropDownSearch>
					</label>
					<label htmlFor="">
						<p>Assigned To Team</p>
						<DropDownSearch
							multiple={false}
							options={teamOptions}
							onSelectItem={(val) => setAssignedToTeam(val)}
							placeholder="Search for Team"
						></DropDownSearch>
					</label>
					<label htmlFor="">
						<p>Add a Project</p>
						<DropDownSearch
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
