import { httpGetNewOptionDropdown } from "@/hooks/requests";
import React, { useEffect, useState } from "react";

const AddContract = () => {
	const [httpDropdown, setHttpDropdown] = useState({});

	const [ticker, setTicker] = useState("");
	const [expiration, setExpiration] = useState("");
	const [strikePrice, setStrikePrice] = useState(0.0);
	const [quantity, setQuantity] = useState(0);
	const [openPrice, setOpenPrice] = useState(0);
	const [dateOpened, setDateOpened] = useState("");
	const [dateClosed, setDateClosed] = useState("");
	const [closingPrice, setClosingPrice] = useState(null);
	const [closed, setClosed] = useState(false);
	const [fees, setFees] = useState(0.0);

	useEffect(() => {
		const fetchDropdown = async () => {
			try {
				const dropdown = await httpGetNewOptionDropdown();
				setHttpDropdown(dropdown);
				console.log(dropdown);
			} catch (error) {
				console.log(error);
			}
		};

		fetchDropdown();
		// console.log(httpDropdown.contract_type[0][1]);
	}, []);

	useEffect(() => {
		console.log(expiration);
	}, [expiration]);

	const handleContractStatus = (status) => {
		// closed = true
		// open = false
		setClosed(status);
		console.log(`Status: ${status}`);
	};

	return (
		<main className="flex flex-col h-screen p-24 items-center">
			<h1 className="text-3xl font-thin tracking-widest mb-4 border-b border-gray-800 pb-2 px-8">
				ADD NEW CONTRACT
			</h1>

			<form className="flex flex-col w-96 space-y-4">
				<div className="input-field">
					<label>Ticker</label>
					<input
						type="text"
						placeholder="Ticker"
						value={ticker}
						onChange={(event) => setTicker(event.target.value)}
						className="input-field-text-boxes"
					/>
				</div>
				<div className="input-field">
					<label>Contract Type</label>
					<select className="input-field-text-boxes">
						{httpDropdown.contract_type?.map((type, i) => (
							<option value={type[0]} key={i}>
								{type[1]}
							</option>
						))}
					</select>
				</div>
				<div className="input-field">
					<label>Position Type</label>
					<select className="input-field-text-boxes">
						{httpDropdown.position_type?.map((type, i) => (
							<option value={type[0]} key={i}>
								{type[1]}
							</option>
						))}
					</select>
				</div>
				<div className="input-field">
					<label>Expiration</label>
					<input
						type="date"
						className="input-field-text-boxes"
						onChange={(event) => setExpiration(event.target.value)}
					/>
				</div>
				<div className="input-field">
					<label>Strike Price</label>
					<input
						type="text"
						inputMode="numeric"
						className="input-field-text-boxes"
						placeholder="Strike Price"
						onChange={(event) => setStrikePrice(event.target.value)}
					/>
				</div>
				<div className="input-field">
					<label>Quantity</label>
					<input
						type="number"
						className="input-field-text-boxes"
						placeholder="Quantity"
						min={0}
						step={1}
						onChange={(event) => setStrikePrice(event.target.value)}
					/>
				</div>
				<div className="input-field">
					<label>Open Price</label>
					<input
						type="text"
						inputMode="numeric"
						className="input-field-text-boxes"
						placeholder="Open Price"
						onChange={(event) => setOpenPrice(event.target.value)}
					/>
				</div>
				<div className="input-field">
					<label>Date Opened</label>
					<input
						type="date"
						className="input-field-text-boxes"
						onChange={(event) => setDateOpened(event.target.value)}
					/>
				</div>
				<div className="input-field">
					<label>Contract Status</label>
					<div className="flex flex-row">
						<div className="flex flex-row space-x-2 items-center">
							<label>Open</label>
							<input
								type="radio"
								name="options_status"
								onChange={() => handleContractStatus(false)}
							/>
						</div>
						<div className="border-x border-gray-800 mx-4" />
						<div className="flex flex-row space-x-2 items-center">
							<label>Closed</label>
							<input
								type="radio"
								name="options_status"
								onChange={() => handleContractStatus(true)}
							/>
						</div>
					</div>
				</div>
				{closed ? (
					<>
						<div className="input-field">
							<label>Date Closed</label>
							<input
								type="date"
								className="input-field-text-boxes"
								onChange={(event) => setDateClosed(event.target.value)}
							/>
						</div>
						<div className="input-field">
							<label>Closing Price</label>
							<input
								type="text"
								inputMode="numeric"
								className="input-field-text-boxes"
								placeholder="Closing Price"
								onChange={(event) => setClosingPrice(event.target.value)}
							/>
						</div>
					</>
				) : (
					<></>
				)}
				<div className="input-field">
					<label>Fees</label>
					<input
						type="text"
						inputMode="numeric"
						className="input-field-text-boxes"
						placeholder="Fees"
						onChange={(event) => setFees(event.target.value)}
					/>
				</div>
			</form>
		</main>
	);
};

export default AddContract;
