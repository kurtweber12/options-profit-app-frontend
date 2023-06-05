const API_URL = "http://localhost:8000";

// fetches the drop down menu options inside the /add-option page
async function httpGetNewOptionDropdown() {
	try {
		const response = await fetch(`${API_URL}/add-contracts/dropdown-options`);
		return response.json();
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

/* 
THIS IS ALL THE DATA SENT IN THE POST REQUEST

{
"ticker": "AAPL",
"contract_type": "CALL",
"position_type": "SELL", 
"expiration": "2023-05-26", 
"strike_price": 175.00,
"quantity": 1, 
"open_price": 90.00, 
"date_opened": "2023-05-16",
"date_closed": "2023-05-18", 
"closing_price": 98.00, 
"closed": true, 
"fees": 1.30, 
"profit": null
}


*/
async function httpPostNewContract(formValues) {
	const data = {
		ticker: formValues.ticker.toUpperCase(),
		contract_type: formValues.contract_type,
		position_type: formValues.position_type,
		expiration: formValues.expiration,
		strike_price: parseFloat(formValues.strike_price),
		quantity: parseInt(formValues.quantity),
		open_price: parseFloat(formValues.open_price),
		date_opened: formValues.date_opened,
		date_closed: formValues.date_closed === "" ? null : formValues.date_closed,
		closing_price:
			formValues.closing_price === ""
				? null
				: parseFloat(formValues.closing_price),
		closed: formValues.closed,
		fees: parseFloat(formValues.fees),
	};
	console.log(data);

	try {
		return await fetch(`${API_URL}/add`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
	} catch (error) {
		console.log(err);
		return {
			ok: false,
		};
	}
}

async function httpGetAllOptions() {
	try {
		const response = await fetch(`${API_URL}/get-all-contracts/`);
		return response.json();
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

async function httpGetSingleOption(id) {
	try {
		const response = await fetch(`${API_URL}/single-contract/${id}`);
		return response.json();
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

// updates existing options contract
async function httpPutSingleOption(id, data) {
	try {
		const response = await fetch(`${API_URL}/single-contract/${id}`, {
			method: "put",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return response;
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

async function httpDeleteOption(options_id) {
	try {
		return await fetch(`${API_URL}/delete/${options_id}`, {
			method: "delete",
		});
	} catch (error) {
		console.log(error);
		return {
			ok: false,
		};
	}
}

export {
	httpGetNewOptionDropdown,
	httpGetAllOptions,
	httpPostNewContract,
	httpDeleteOption,
	httpGetSingleOption,
	httpPutSingleOption,
};
