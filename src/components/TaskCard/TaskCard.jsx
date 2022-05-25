import React, { useState, useEffect } from "react";
import moment from "moment";
import Avatar from "../Avatar/Avatar";
import ProgressBar from "../ProgressBar/ProgressBar";
import Tag from "../Tag/Tag";
import "./TaskCard.css";
import CheckBox from "../CheckBox/CheckBox";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import ThreeDotMenu from "../ThreeDotMenu/ThreeDotMenu";
import { completeTask, getUserTasks } from "../../store/actions/taskAction";
import { getUserProjects } from "../../store/actions/projectAction";
import { getUserTeams } from "../../store/actions/teamAction";
import { getUserUsers } from "../../store/actions/userActions";

const TaskCard = (props) => {
	const currentUser = useSelector((state) => state.auth.user);
	const { task, handleOnComplete, handleOnDelete, handleOnEdit } = props;
	const dispatch = useDispatch();
	const taskStatus = () => {
		switch (task.status) {
			case "in-progress":
				return <p className="status">{task.progress + "%"}</p>;
			case "done":
				return <p className="status correct">{"done"}</p>;
			case "due":
				if (task.endDate)
					return <p className="status error">{"due"}</p>;
				else return null;
			default:
				return null;
		}
	};
	const [expand, setExpand] = useState(false);
	const handleExpand = () => {
		setExpand(!expand);
	};
	const choosePrimaryColor = () => {
		const random = Math.random();
		if (random >= 0 && random < 0.3) return "green";
		if (random >= 0.3 && random < 0.6) return "pink";
		if (random >= 0.6 && random <= 1) return "yellow";
	};
	const handleOnClickDelete = () => {
		handleOnDelete(task.id);
	}
	const handleOnClickComplete = () => {
		handleOnComplete(task.id);
	};
	const handleOnClickEdit = () => {
		handleOnEdit(task.id);
	};
	
	let menuOptions = [];
	if (currentUser.id === task.assignedBy.id) {
		menuOptions = [
			{
				title: (
					<>
						Done
						<span class="material-icons-round">done</span>
					</>
				),
				onClick: handleOnClickComplete,
			},
			{
				title: (
					<>
						Edit
						<span class="material-icons-round">edit</span>
					</>
				),
				onClick: handleOnClickEdit,
			},
			{
				title: (
					<>
						Delete
						<span class="material-icons-round">clear</span>
					</>
				),
				onClick: handleOnClickDelete,
			},
		];
	}
	
	return (
		<div className="task-card-container">
			<header>
				<div className="tags">
					{task.project ? (
						<Tag
							innerHtml={task.project.name}
							type="primary"
							color={choosePrimaryColor()}
						></Tag>
					) : null}
					{task.tags.map((tag) => (
						<Tag innerHtml={tag} type="dimmed"></Tag>
					))}
				</div>
				<ThreeDotMenu
					options={menuOptions}
					position="bottom-left"
				></ThreeDotMenu>
			</header>
			{task.team ? <p className="team-name">{task.team.name}</p> : null}
			<div className="title">
				<p>{task.title}</p>
				{task.subTasks.length === 0 ? null : (
					<span class="material-icons-round" onClick={handleExpand}>
						{!expand ? "expand_more" : "expand_less"}
					</span>
				)}
			</div>
			<div className="description">{task.description}</div>
			{task.status === "in-progress" ? (
				<ProgressBar progress={task.progress}></ProgressBar>
			) : null}

			{task.subTasks.length === 0 ? null : (
				<div className={`sub-tasks ${expand ? "expand" : null}`}>
					<p>Sub Tasks: </p>
					{task.subTasks.map((subTask) => (
						<label>
							{/* <input type="checkbox" name="" id="" /> */}
							<CheckBox
								initialChecked={
									subTask.status === "done" ? true : false
								}
							></CheckBox>
							<div>
								<p>{subTask.title}</p>
								<p className="description">
									{subTask.description}
								</p>
							</div>
						</label>
					))}
				</div>
			)}

			<div className="info">
				<p className="date">
					<span class="material-icons-round">date_range</span>
					{task.endDate
						? moment(task.endDate).toDate().toDateString()
						: "-"}
				</p>

				{taskStatus()}
			</div>
			<div className="assigned-to">
				<div className="avatars">
					<Avatar user={task.assignedTo[0]} size="30"></Avatar>
					{task.assignedTo[1] ? (
						<Avatar user={task.assignedTo[1]} size="30"></Avatar>
					) : null}
					{task.assignedTo[2] ? (
						<Avatar user={task.assignedTo[2]} size="30"></Avatar>
					) : null}
				</div>

				{task.assignedTo.length > 3
					? `+ ${task.assignedTo.length - 3} others`
					: null}
			</div>
			
		</div>
	);
};

export default TaskCard;
