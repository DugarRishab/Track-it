import React from "react";
import Avatar from "../Avatar/Avatar";
import ProgressBar from "../ProgressBar/ProgressBar";
import Tag from "../Tag/Tag";
import "./TaskCard.css";

const TaskCard = (props) => {
	const { task } = props;
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
				<p className="status">
					{task.status === "in-progress"
						? task.progress
						: task.status === "done"
						? task.status
						: task.dueDate
						? task.status
						: null}
				</p>
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

				{`+ ${task.assignedTo.length - 3} others`}
			</div>
		</div>
	);
};

export default TaskCard;
