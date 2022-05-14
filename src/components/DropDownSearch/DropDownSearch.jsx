import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import "./DropDownSearch.css";

const DropDownSearch = ({ options, multiple, onSelectItem, placeholder }) => {
	const [selectedItems, setSelectedItems] = useState([]);
	if (multiple) {
		
	}
	const [optionsToBeViewed, setOptionsToBeViewed] = useState([]);
	// options = [
	// 	{
	// 		name: "Rishab Dugar",
	// 		val: "jf9302h8",
	// 	},
	// ];
	// console.log(selectedItems);
	const onSelect = (val) => {
		if (multiple) {
			if (!selectedItems.includes(val)) {
				console.log(val);
				setSelectedItems([...selectedItems, val]);
			}
		} else {
			setSelectedItems(val);
		}

		onSelectItem(selectedItems);
	};
	const onRemove = (val) => {
		if (multiple) {
			setSelectedItems((selectedItems) =>
				selectedItems.filter((item) => item !== val)
			);
		} else {
			setSelectedItems("");
		}
	};

	const searchDropDown = (options, val) => {
		if (val.length >= 3) {
			const results = options.filter((option) =>
				option.name.toUpperCase().includes(val.toUpperCase())
			);
			console.log(results);
			// return results;
			setOptionsToBeViewed(results);
		} else {
			setOptionsToBeViewed([]);
		}
	};

	const showDropDown = () => {};
	return (
		<div className="dropdown-search-container">
			<div className="search">
				<input
					type="text"
					onInput={(e) => searchDropDown(options, e.target.value)}
					placeholder={placeholder}
				/>
			</div>
			<div className="selected-items">
				{multiple ? (
					selectedItems.map((item) => (
						<div className="profile profile--with-close">
							<div className="user-info">
								<Avatar
									size="30"
									user={options.find(
										(option) => option.val === item
									)}
								></Avatar>
								<p>
									{
										// console.log(item)
										options.find(
											(option) => option.val === item
										).name
									}
								</p>
							</div>
							<span
								class="material-icons-round"
								onClick={() => onRemove(item)}
							>
								close
							</span>
						</div>
					))
				) : selectedItems.length > 0 ? (
					<div className="profile">
						<Avatar
							size="40"
							user={options.find(
								(option) => option.val === selectedItems
							)}
						></Avatar>
						<p>
							{
								options.find(
									(option) => option.val === selectedItems
								).name
							}
						</p>
						<span
							class="material-icons-round"
							onClick={() => onRemove(selectedItems)}
						>
							close
						</span>
					</div>
				) : null}
			</div>
			{optionsToBeViewed.length > 0 ? (
				<div className="dropdown-list">
					<ul>
						{optionsToBeViewed.map((option) => (
							<li
								className={`option ${
									selectedItems === option.val ||
									selectedItems.includes(option.val)
										? "selected"
										: null
								}`}
								data={option.val}
								onClick={() => onSelect(option.val)}
							>
								<div className="profile">
									<Avatar user={option} size="40"></Avatar>
									<p>{option.name}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	);
};

export default DropDownSearch;
