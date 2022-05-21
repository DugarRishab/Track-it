import React, { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import Avatar from '../../components/Avatar/Avatar';
import TaskCard from '../../components/TaskCard/TaskCard';
import Tag from '../../components/Tag/Tag';
import InfoCard from './InfoCard';
import RightCarousel from './RightCarousel';
import { getUserTasks, openAddTaskForm, closeAddTaskForm } from '../../store/actions/taskAction';



import './Tasks.css';
import AddTask from '../AddTask/AddTask';
import { getUserProjects } from '../../store/actions/projectAction';
import { getUserTeams } from '../../store/actions/teamAction';
import { getUserUsers } from '../../store/actions/userActions';

const Tasks = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [activeCategory, setActiveCategory] = useState("assignedToMe");
	// const [addTaskOpen, setAddTaskOpen] = useState(false);
	const addTaskOpen = useSelector(state => state.task.openAddTaskForm);

	useEffect(() => {

		dispatch(getUserTasks());
		dispatch(getUserProjects());
		dispatch(getUserTeams());
		dispatch(getUserUsers());
		
	}, [dispatch]);
	useEffect(() => {
		const category =
			queryString.parse(location.search).category || "assignedToMe";
		setActiveCategory(category);

	}, [location]);

	// const tasks = [
	// 	{
	// 		tag: ["instagram"],
	// 		title: "Photo Profile Instagram",
	// 		description: "I wan to make a cool profile photo for Instagram",
	// 		dueDate: "",
	// 		assignedTo: [
	// 			{
	// 				name: "Rishab Dugar",
	// 				img: "../../res/img/user1.png",
	// 			},
	// 		],
	// 		status: "due",
	// 		team: "",
	// 		img: "",
	// 		progress: "0%",
	// 	},
	// 	{
	// 		tag: ["Dribble"],
	// 		title: "Make designs",
	// 		description: "I wan to make a cool profile photo for Instagram",
	// 		dueDate: "",
	// 		assignedTo: [
	// 			{
	// 				name: "Rishab Dugar",
	// 				img: "../../res/img/user1.png",
	// 			},
	// 		],
	// 		status: "due",
	// 		team: "",
	// 		img: "",
	// 		progress: 0,
	// 	},
	// 	{
	// 		tag: ["Sharing"],
	// 		title: "Create Material for sharing section",
	// 		description: "Create material for sharing about basic webflow",
	// 		dueDate: "Wed, 14th Jan 2022",
	// 		assignedTo: [
	// 			{
	// 				name: "Rishab Dugar",
	// 				img: "",
	// 			},
	// 			{
	// 				name: "Niket",
	// 				img: "",
	// 			},
	// 			{
	// 				name: "Naman",
	// 				img: "",
	// 			},
	// 			{
	// 				name: "Akash",
	// 				img: "",
	// 			},
	// 		],
	// 		status: "in-progress",
	// 		team: "Enver Studio",
	// 		img: "",
	// 		progress: 70,
	// 	},
	// 	{
	// 		tag: ["Dribble"],
	// 		title: "Dribble Shot ⚡",
	// 		description:
	// 			"|'ve made a dribbble design with the task management theme",
	// 		dueDate: "Wed, 14th Jan 2022",
	// 		assignedTo: [
	// 			{
	// 				name: "Rishab Dugar",
	// 				img: "",
	// 			},
	// 			{
	// 				name: "Niket",
	// 				img: "",
	// 			},
	// 			{
	// 				name: "Naman",
	// 				img: "",
	// 			},
	// 			{
	// 				name: "Akash",
	// 				img: "",
	// 			},
	// 		],
	// 		status: "done",
	// 		team: "Enver Studio",
	// 		img: "",
	// 		progress: 100,
	// 	},
	// ];
	const assignedByMeTasks = useSelector(state => state.task.assignedByUserTasks);
	const assignedToMeTasks = useSelector(state => state.task.assignedToUserTasks);
	let tasks = [];

	if (activeCategory === "assignedToMe") {
		tasks = assignedToMeTasks;
	}
	else if (activeCategory === "assignedByMe"){
		tasks = assignedByMeTasks;
	}

	const BacklogTasks = tasks.filter(task => task.status === "due");
	const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
	const doneTasks = tasks.filter((task) => task.status === "done");
	
	// const isMobileDevice = useMediaQuery({
	// 	query: "(min-device-width: 480px)",
	// });
	// const isTabletDevice = useMediaQuery({
	// 	query: "(min-device-width: 768px)",
	// });
	// const isLaptop = useMediaQuery({
	// 	query: "(min-device-width: 1024px)",
	// });
	// const isDesktop = useMediaQuery({
	// 	query: "(min-device-width: 1200px)",
	// });
	return (
		<>
			<MediaQuery minWidth={1025}>
				<div className="task-page">
					{addTaskOpen ? (
						<div className="add-task-container">
							<AddTask></AddTask>
						</div>
					) : null}

					<div className="left-panel">
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
									<div className="sub-text">
										Managing your tasks is easy with Task
										Management
									</div>
								</div>
							</header>
							<div className="contents">
								<div className="panel">
									<Tag
										innerHtml={
											<>
												Backlog &nbsp;
												<Tag
													innerHtml={ <p>{BacklogTasks.length}</p>}
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
										<TaskCard task={task}></TaskCard>
									))}
								</div>
								<div className="panel">
									<Tag
										innerHtml={
											<>
												In Progress &nbsp;
												<Tag
													innerHtml={ <p>{inProgressTasks.length}</p>}
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
										<TaskCard task={task}></TaskCard>
									))}
								</div>
								<div className="panel">
									<Tag
										innerHtml={
											<>
												Done &nbsp;
												<Tag
													innerHtml={ <p>{doneTasks.length}</p>}
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
										<TaskCard task={task}></TaskCard>
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
			</MediaQuery>
			{/* <MediaQuery maxWidth={1024} minWidth={481}>
				<div className="task-page tablet">
					<h1>SMALL SCREEN / TABLET</h1>
				</div>
			</MediaQuery> */}
			<MediaQuery maxWidth={1024}>
				<div className="task-page mobile">
					<div className="left-panel">
						<section className="search-container">
							<form action="" className="search-bar">
								<input type="text" placeholder="Search..." />
								<span className="material-icons" width="18">
									search
								</span>
							</form>
						</section>
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
									<div className="sub-text">
										Managing your tasks is easy with Task
										Management
									</div>
								</div>
							</header>
							<div className="contents">
								<div className="panel">
									<Tag
										innerHtml={
											<>
												In Progress &nbsp;
												<Avatar
													user={{
														name: `${inProgressTasks.length}`,
													}}
													size="25"
													color="pink"
												></Avatar>
											</>
										}
										color="pink"
										type="secondary"
									></Tag>
									{inProgressTasks.map((task) => (
										<TaskCard task={task}></TaskCard>
									))}
								</div>
								<div className="panel">
									<Tag
										innerHtml={
											<>
												Backlog &nbsp;
												<Avatar
													user={{
														name: `${BacklogTasks.length}`,
													}}
													size="25"
													color="yellow"
												></Avatar>
											</>
										}
										color="yellow"
										type="secondary"
									></Tag>
									{BacklogTasks.map((task) => (
										<TaskCard task={task}></TaskCard>
									))}
								</div>

								<div className="panel">
									<Tag
										innerHtml={
											<>
												Done &nbsp;
												<Avatar
													user={{
														name: `${doneTasks.length}`,
													}}
													size="25"
													color="green"
												></Avatar>
											</>
										}
										color="green"
										type="secondary"
									></Tag>
									{doneTasks.map((task) => (
										<TaskCard task={task}></TaskCard>
									))}
								</div>
							</div>
						</section>
					</div>
				</div>
			</MediaQuery>
		</>
	);

}
 
export default Tasks;