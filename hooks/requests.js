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
async function httpPostNewContract() {
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

export { httpGetNewOptionDropdown, httpGetAllOptions, httpPostNewContract };
