import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { httpGetNewOptionDropdown } from "@/utils/requests";
import useForm from "@/hooks/useForm";

const Form = ({ onSubmit, handleInputChange, formValues, setFormValues }) => {
	// const { handleInputChange, formValues, setFormValues } = useForm();
	const [httpDropdown, setHttpDropdown] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(formValues);
	};

	const handleContractStatus = (status) => {
		// closed = true
		// open = false
		setFormValues((prevValues) => ({
			...prevValues,
			closed: status,
		}));
		//setClosed(status);
		console.log(`Status: ${status}`);
	};

	useEffect(() => {
		const fetchDropdown = async () => {
			try {
				const dropdown = await httpGetNewOptionDropdown();
				setHttpDropdown(dropdown);
				console.log(dropdown);
				if (dropdown.contract_type?.length > 0) {
					setFormValues((prevValues) => ({
						...prevValues,
						contract_type: dropdown.contract_type[0][0],
					}));
				}
				if (dropdown.position_type?.length > 0) {
					setFormValues((prevValues) => ({
						...prevValues,
						position_type: dropdown.position_type[0][0],
					}));
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchDropdown();
		// console.log(httpDropdown.contract_type[0][1]);
	}, []);
	return (
		<form className="flex flex-col w-96 space-y-4" onSubmit={handleSubmit}>
			<div className="input-field">
				<label>Ticker</label>
				<input
					type="text"
					name="ticker"
					placeholder="Ticker"
					pattern="[a-zA-Z]+"
					value={formValues.ticker}
					onChange={handleInputChange}
					className="input-field-text-boxes"
				/>
			</div>
			<div className="input-field">
				<label>Contract Type</label>
				<select
					className="input-field-text-boxes"
					name="contract_type"
					value={formValues.contract_type}
					onChange={handleInputChange}
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
					value={formValues.expiration}
					name="expiration"
					type="date"
					className="input-field-text-boxes"
					onChange={handleInputChange}
				/>
			</div>
			<div className="input-field">
				<label>Strike Price</label>
				<input
					type="text"
					inputMode="numeric"
					pattern="\d+(\.\d+)?"
					className="input-field-text-boxes"
					name="strike_price"
					placeholder="Strike Price"
					value={formValues.strike_price}
					onChange={handleInputChange}
				/>
			</div>
			<div className="input-field">
				<label>Quantity</label>
				<input
					type="number"
					className="input-field-text-boxes"
					name="quantity"
					pattern="\d+"
					placeholder="Quantity"
					value={formValues.quantity}
					min={0}
					step={1}
					onChange={handleInputChange}
				/>
			</div>
			<div className="input-field">
				<label>Open Price</label>
				<input
					type="text"
					inputMode="numeric"
					name="open_price"
					pattern="\d+(\.\d+)?"
					className="input-field-text-boxes"
					placeholder="Open Price"
					value={formValues.open_price}
					onChange={handleInputChange}
				/>
			</div>
			<div className="input-field">
				<label>Date Opened</label>
				<input
					type="date"
					name="date_opened"
					className="input-field-text-boxes"
					value={formValues.date_opened}
					onChange={handleInputChange}
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
							checked={!formValues.closed}
							onChange={() => handleContractStatus(false)}
						/>
					</div>
					<div className="border-x border-gray-800 mx-4" />
					<div className="flex flex-row space-x-2 items-center">
						<label>Closed</label>
						<input
							type="radio"
							name="options_status"
							checked={formValues.closed}
							onChange={() => handleContractStatus(true)}
						/>
					</div>
				</div>
			</div>
			{formValues.closed ? (
				<>
					<div className="input-field">
						<label>Date Closed</label>
						<input
							type="date"
							name="date_closed"
							className="input-field-text-boxes"
							value={formValues.date_closed}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-field">
						<label>Closing Price</label>
						<input
							type="text"
							inputMode="numeric"
							name="closing_price"
							pattern="\d+(\.\d+)?"
							className="input-field-text-boxes"
							placeholder="Closing Price"
							value={formValues.closing_price}
							onChange={handleInputChange}
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
					pattern="\d+(\.\d+)?"
					className="input-field-text-boxes"
					name="fees"
					placeholder="Fees"
					value={formValues.fees}
					onChange={handleInputChange}
				/>
			</div>
			<div className="flex space-x-4 justify-end py-3 mt-4 border-t border-gray-800">
				<Link href="/">
					<button className="contract-home-button">Home</button>
				</Link>
				<button
					className="contract-submit-button"
					//onClick={(event) => handleSubmit(event)}
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default Form;
