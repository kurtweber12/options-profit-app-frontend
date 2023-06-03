import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
	httpGetNewOptionDropdown,
	httpGetSingleOption,
	httpPutSingleOption,
} from "@/utils/requests";
import Link from "next/link";

const Edit = () => {
	const router = useRouter();

	const id = router.query.slug;

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

	const [contractType, setContractType] = useState();
	const [positionType, setPositionType] = useState();

	const [optionsDataState, setOptionsDataState] = useState(null);

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

		const fetchSingleOption = async (id) => {
			try {
				const optionData = await httpGetSingleOption(id);
				setOptionsDataState(optionData);
				console.log(`ID: ${id}`);
				console.log(optionData);
				setTicker(optionData.ticker);
				setExpiration(optionData.expiration);
				setStrikePrice(optionData.strike_price);
				setQuantity(optionData.quantity);
				setOpenPrice(optionData.open_price);
				setDateOpened(optionData.date_opened);
				setDateClosed(optionData.date_closed);
				setClosingPrice(optionData.closing_price);
				setClosed(optionData.closed);
				setFees(optionData.fees);

				setContractType(optionData.contract_type);
				setPositionType(optionData.position_type);
			} catch (error) {
				console.log(error);
			}
		};
		fetchDropdown();
		if (id) {
			fetchSingleOption(id);
		}
	}, [id]);

	useEffect(() => {
		console.log(expiration);
	}, [expiration]);

	const handleContractStatus = (status) => {
		// closed = true
		// open = false
		setClosed(status);
		console.log(`Status: ${status}`);
	};

	const handleSubmit = () => {
		router.push("/");
	};

	return (
		<main className="flex flex-col h-screen p-24 items-center">
			<h1 className="text-3xl font-thin tracking-widest mb-4 border-b border-gray-800 pb-2 px-8">
				UPDATE CONTRACT
			</h1>
			<div>
				{optionsDataState && (
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
							<select
								className="input-field-text-boxes"
								value={contractType}
								onChange={(event) => {
									setContractType(event.target.value);
								}}
							>
								{httpDropdown.contract_type?.map((type, i) => (
									<option value={type[0]} key={i}>
										{type[1]}
									</option>
								))}
							</select>
						</div>
						<div className="input-field">
							<label>Position Type</label>
							<select
								className="input-field-text-boxes"
								value={positionType}
								onChange={(event) => {
									setPositionType(event.target.value);
								}}
							>
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
								value={expiration}
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
								value={strikePrice}
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
								value={quantity}
								onChange={(event) => setQuantity(event.target.value)}
							/>
						</div>
						<div className="input-field">
							<label>Open Price</label>
							<input
								type="text"
								inputMode="numeric"
								className="input-field-text-boxes"
								placeholder="Open Price"
								value={openPrice}
								onChange={(event) => setOpenPrice(event.target.value)}
							/>
						</div>
						<div className="input-field">
							<label>Date Opened</label>
							<input
								type="date"
								className="input-field-text-boxes"
								value={dateOpened}
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
										checked={!closed}
										onChange={() => handleContractStatus(false)}
									/>
								</div>
								<div className="border-x border-gray-800 mx-4" />
								<div className="flex flex-row space-x-2 items-center">
									<label>Closed</label>
									<input
										type="radio"
										name="options_status"
										checked={closed}
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
										value={dateClosed}
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
										value={closingPrice}
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
								value={fees}
								onChange={(event) => setFees(event.target.value)}
							/>
						</div>
					</form>
				)}
				<div className="flex space-x-4 justify-end py-3 mt-4 border-t border-gray-800">
					<Link href="/">
						<button className="contract-home-button">Home</button>
					</Link>
					{optionsDataState && (
						<button
							className="contract-submit-button"
							onClick={() => handleSubmit()}
						>
							Submit
						</button>
					)}
				</div>
			</div>
		</main>
	);
};

export default Edit;
