import React from "react";

function Search({ handleSearchFilter }) {
	return (
		<div className="search-bar">
			<input
				type={"text"}
				name={"search"}
				placeholder={"Search / Filter Results"}
				className="search-input"
				onChange={(e) => {
					handleSearchFilter(e);
				}}
			/>
		</div>
	);
}

export default Search;
