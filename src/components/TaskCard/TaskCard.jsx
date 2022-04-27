import React from "react";
import Avatar from "../Avatar/Avatar";
import ProgressBar from "../ProgressBar/ProgressBar";
import Tag from "../Tag/Tag";
import "./TaskCard.css";

const TaskCard = (props) => {
	const { task } = props;
	const taskStatus = () => {
		switch (task.status) {
			case "in-progress":
				return <p className="status">{task.progress + "%"}</p>;
			case "done":
				return <p className="status correct">{"done"}</p>;
			case "due":
				if (task.dueDate) return <p className="status error">{"due"}</p>;
				else return null;
			default:
				return null;
		}
	}
	return (
		<div className="task-card-container">
			<header>
				{task.tag.map((tag) => (
					<Tag innerHtml={tag} type="dimmed"></Tag>
				))}
			</header>
			{task.team ? <p className="team-name">{task.team}</p> : null}
			<div className="title">{task.title}</div>
			<div className="description">{task.description}</div>
			{task.status === "in-progress" ? <ProgressBar progress={task.progress}></ProgressBar> : null}
			<div className="info">
				<p className="date">
					<span class="material-icons-round">date_range</span>
					{task.dueDate ? task.dueDate : "-"}
				</p>
				{/* <p className="status">
					{task.status === "in-progress"
						? task.progress + "%"
						: task.status === "done"
						? task.status
						: task.dueDate
						? task.status
						: null}
				</p> */}
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

				{ task.assignedTo.length > 3 ? `+ ${task.assignedTo.length - 3} others` : null}
			</div>
		</div>
	);
};

export default TaskCard;
