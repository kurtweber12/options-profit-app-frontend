import {
	httpGetNewOptionDropdown,
	httpPostNewContract,
} from "@/hooks/requests";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";

const AddContract = () => {
	const router = useRouter();

	const [httpDropdown, setHttpDropdown] = useState({});
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addStatus, setAddStatus] = useState("");

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

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		console.log(formValues);
		const response = await httpPostNewContract(formValues);
		if (response.ok === false) {
			console.log("error");
			setAddStatus("error");
		} else {
			setAddStatus("success");
			console.log("success");
			console.log(response);
		}
		setLoading(false);
		setShowSuccessModal(true);

		//router.push("/");
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
						name="ticker"
						placeholder="Ticker"
						pattern="[A-Z]"
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
						onClick={(event) => handleSubmit(event)}
					>
						Submit
					</button>
				</div>
				<div className="flex justify-center">
					<BarLoader color={"#437856"} loading={loading} size={20} />
				</div>
			</form>
			{showSuccessModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="fixed inset-0 bg-black opacity-50 "></div>
					<div className="relative bg-neutral-700 rounded p-8">
						{addStatus === "success" && (
							<div className="flex flex-col items-center">
								<p className="text-green-600 text-lg font-bold">
									Add contract successful!
								</p>
								<button
									className="px-4 py-2 mt-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
									onClick={() => {
										setShowSuccessModal(false);
										setAddStatus("");
										router.push("/");
									}}
								>
									Close
								</button>
							</div>
						)}
						{addStatus === "error" && (
							<div className="flex flex-col items-center">
								<p className="text-red-600 text-lg font-bold">
									An error occured during the add contract process.
								</p>
								<button
									className="px-4 py-2 mt-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
									onClick={() => {
										setShowSuccessModal(false);
										setAddStatus("");
										window.location.reload(false);
									}}
								>
									Close
								</button>
							</div>
						)}
					</div>
				</div>
			)}
		</main>
	);
};

export default AddContract;
