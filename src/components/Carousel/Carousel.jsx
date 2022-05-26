import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ contents, height, width }) => {
	const [currentSlide, setCurrentSlide] = useState(1);
	const slideStyle = {
		marginLeft: -100 * (currentSlide - 1) + "%",
	};
	const containerStyle = {
		height: height || 'fit-content',
		width: width || '100%'
	}
	let barItterator = 0;

	const handleChangeSlide = (direction) => {
		if (direction === 'right') {
			if (currentSlide === contents.length) {
				setCurrentSlide(1);
			} else {
				setCurrentSlide(currentSlide + 1);
			}
		}
		else if (direction === 'left') {
			if (currentSlide === 1) {
				setCurrentSlide(contents.length);
			} else {
				setCurrentSlide(currentSlide - 1);
			}
		}
		
	};
	return (
		<div className="carousel-container" style={containerStyle}>
			<div className="slides" style={slideStyle}>
				{contents.map((content) => (
					<div className="slide">
						<img src={content} alt={content} />
					</div>
				))}
			</div>
			<div className="controllers">
				<div className="item">
					<span
						className="material-icons-round dimmed"
						onClick={() => handleChangeSlide("left")}
					>
						chevron_left
					</span>
				</div>
				<div className="item">
					<span
						className="material-icons-round dimmed"
						onClick={() => handleChangeSlide("right")}
					>
						chevron_right
					</span>
				</div>
			</div>
			<div className="viewers">
				{contents.map(() => {
					barItterator++;

					return (
						<div
							className={`bars ${
								barItterator === currentSlide ? "active" : null
							}`}
						></div>
					);
				})}
			</div>
		</div>
	);
}
 
export default Carousel;