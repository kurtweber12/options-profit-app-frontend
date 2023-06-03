import { useState } from "react";

const useFilter = () => {
	const [filter, setFilter] = useState({
		ticker: "",
		year: "",
	});

	const handleFilterChange = (name, value) => {
		setFilter((prevFilter) => ({
			...prevFilter,
			[name]: value,
		}));
		console.log(name, value);
	};

	return { filter, handleFilterChange };
};

export default useFilter;
