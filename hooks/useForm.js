import { useState } from "react";

const useForm = () => {
	const [formValues, setFormValues] = useState({
		ticker: "",
		contract_type: "",
		position_type: "",
		expiration: "",
		strike_price: "",
		quantity: "",
		open_price: "",
		date_opened: "",
		date_closed: "",
		closing_price: "",
		closed: false,
		fees: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	return { formValues, handleInputChange, setFormValues };
};

export default useForm;
