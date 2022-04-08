import React, { useState, useRef, useCallback } from "react";

import "./DragNDrop.css";

function DragNDrop({ list, setList }) {
	const [dragging, setDragging] = useState(false);

	//ref var stays the same across re-rendering
	const dragItem = useRef();
	const dragNode = useRef();

	const handleDragStart = (e, params) => {
		console.log("Drag Starting...");
		dragItem.current = params;
		dragNode.current = e.target;
		dragNode.current.addEventListener("dragend", handleDragEnd);
		setTimeout(() => {
			setDragging(true);
		}, 0);
	};

	const handleDragEnter = useCallback(
		(e, params) => {
			// console.log("Entering Drag..", params);
			const currentItem = dragItem.current;
			if (e.target !== dragNode.current) {
				// console.log("target is not the same");
				setList((oldList) => {
					//get a deep copy of the oldList so we can manipulate newList
					let newList = JSON.parse(JSON.stringify(oldList));
					//adding the item to the new position and removing it from previous in one go
					newList.memes.splice(
						params.itemI,
						0,
						newList.memes.splice(currentItem.itemI, 1)[0]
					);
					dragItem.current = params;
					return newList;
				});
			}
		},
		[setList]
	);
	const handleDragEnd = () => {
		console.log("ending drag");
		setDragging(false);
		dragNode.current.removeEventListener("dragend", handleDragEnd);
		dragItem.current = null;
		dragNode.current = null;
	};
	//Bug: hovering over the div shows the text but once I hover over the text the mouse Out event fires
	const handleHoverIn = (e) => {
		e.target.children[0].className = "dnd-overlay show";
	};
	const handleHoverOut = (e) => {
		e.target.className = "dnd-overlay";
	};
	//this is supposed to keep the styles even When I hover over the text
	const handleChildIn = (e) => {
		e.target.parentNode.className = "dnd-overlay show";
	};

	return (
		<div className="drag-n-drop">
			{list.map((item, itemI) => (
				<div
					// decided to add the image as a background image so I can add the overlay hen hovered
					style={{
						background: `url(${item.url})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat"
					}}
					draggable
					onDragStart={(e) => {
						handleDragStart(e, { itemI });
					}}
					onDragEnter={
						dragging
							? (e) => {
									handleDragEnter(e, { itemI });
							  }
							: null
					}
					key={item.id}
					className={"dnd-item"}
					id={item.name}
					onMouseEnter={(e) => {
						handleHoverIn(e);
					}}
				>
					<div
						className="dnd-overlay"
						onMouseOut={(e) => {
							handleHoverOut(e);
						}}
					>
						<h5
							className={"dnd-text"}
							onMouseEnter={(e) => {
								handleChildIn(e);
							}}
						>
							{item.name}
						</h5>
					</div>
				</div>
			))}
		</div>
	);
}

export default React.memo(DragNDrop);
