import React, { useEffect, useState } from "react";
import "./App.css";
import DragNDrop from "./Library/DragNDrop/DragNDrop";
import Search from "./Library/Search/Search";

//mock data used to style components
// const data = [
// 	{ id: 1, name: "alex", url: "https://i.imgflip.com/30b1gx.jpg" },
// 	{ id: 2, name: "paul", url: "https://i.imgflip.com/30b1gx.jpg" }
// ];

function App() {
	//init state
	let [apiData, setApiData] = useState({ memes: [] });
	//making init api call on page load
	useEffect(() => {
		const sendRequest = () => {
			fetch("https://api.imgflip.com/get_memes")
				.then((response) => response.json())
				.then((data) => {
					setApiData(data.data);
				});
		};
		sendRequest();
	}, []);
	console.log(apiData);

	const handleSearchEvent = (e) => {
		//grabs input value and splits it to iterate
		let words = e.target.value.trim().toLowerCase().split(" ");
		apiData.memes.forEach((item, idx) => {
			//to keep search logic simple we'll grab the DOM node
			const elem = document.getElementById(item.name);
			//looping through the words in our input
			for (let i = 0; i < words.length; i++) {
				if (item.name.toLowerCase().indexOf(words[i]) === -1) {
					//if the word is not in the item name hide it
					elem.attributes.class.value = "hide";
				} else {
					//otherwise show it
					elem.attributes.class.value = "dnd-item";
				}
			}
		});
	};

	return (
		<>
			<h1 className="main-title">
				A glimpse of the work we've done for <br /> forward thinking brands and
				clients
			</h1>
			<Search handleSearchFilter={handleSearchEvent} />
			<DragNDrop list={apiData.memes} setList={setApiData} />
		</>
	);
}

export default App;
