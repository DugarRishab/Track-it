import React, { useState } from "react";
import productiveImg from "../../res/img/illustrations/productivity.jpg";
import writeImg from "../../res/img/illustrations/write.jpg";

const RightCarousel = () => {
	const content = [
		{
			img: writeImg,
			title: "Write better Tasks",
			subText: "This guide is here to help you write better tasks",
		},
		{
			img: productiveImg,
			title: "Increase your Productivity",
			subText:
				"Follow this guide to increase your Productivity and stay ahead of your tasks",
		},
	];

	const [currentSlide, setCurrentSlide] = useState(1);
	const slideStyle = {
		marginLeft: -100 * (currentSlide - 1) + "%",
	};
	let barItterator = 0;

	const handleChangeSlide = () => {
		if (currentSlide === content.length) {
			setCurrentSlide(1);
		} else {
			setCurrentSlide(currentSlide + 1);
		}
	};
	return (
		<div className="carousel">
			<div className="slides" style={slideStyle}>
				{content.map((item) => (
					<div className="item">
						<img src={item.img} alt="" />
						<div className="content">
							<div className="title">{item.title}</div>
							<div className="sub-text">{item.subText}</div>
						</div>
					</div>
				))}
			</div>
			<div className="carousel-controls">
				<div className="viewers">
					{content.map(() => {
						barItterator++;
						console.log(barItterator);
						return (
							<div
								className={`bars ${
									barItterator === currentSlide ? "active" : null
								}`}
							></div>
						);
						
					})}
				</div>
				<div className="slider">
					<span
						className="material-icons-round dimmed"
						onClick={() => handleChangeSlide()}
					>
						chevron_right
					</span>
				</div>
			</div>
		</div>
	);
};

export default RightCarousel;
