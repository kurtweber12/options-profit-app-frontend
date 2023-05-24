import React, { useEffect, useState } from "react";
import { httpGetAllOptions, httpDeleteOption } from "@/hooks/requests";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

const Overview = () => {
	const [httpOptions, setHttpOptions] = useState([]);

	const [deleteRow, setDeleteRow] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [deleteStatus, setDeleteStatus] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await httpGetAllOptions();
				setHttpOptions(data);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleDelete = async (deleteOption) => {
		try {
			await httpDeleteOption(deleteOption.id);
			setDeleteStatus("success");
			setShowSuccessModal(true);
			setTimeout(() => {
				setShowSuccessModal(false);
				window.location.reload(false);
			}, 1500);
		} catch (error) {
			console.log(error);
			setDeleteStatus("error");
			setShowModal(true);
		}
	};

	return (
		<div className="flex flex-col w-full mr-4">
			<h2 className="text-2xl font-bold">Overview</h2>
			<table className="table-items table-auto">
				<tbody>
					<tr>
						<th className="table-items">Ticker</th>
						<th className="table-items">Contract Type</th>
						<th className="table-items">Position Type</th>
						<th className="table-items">Expiration</th>
						<th className="table-items">Strike Price</th>
						<th className="table-items">Quantity</th>
						<th className="table-items">Open Price</th>
						<th className="table-items">Close Price</th>
						<th className="table-items">Date Opened</th>
						<th className="table-items">Date Closed</th>
						<th className="table-items">Closed</th>
						<th className="table-items">Fees</th>
						<th className="table-items">Profit/Loss</th>
						<th className="table-items">Edit</th>
						<th className="table-items">Delete</th>
					</tr>

					{httpOptions.map((option) => {
						let color = "";
						if (option.closed === false) {
							color = "bg-yellow-600";
						} else if (option.closed === true && option.profit > 0.0) {
							color = "bg-green-800";
						} else if (option.closed === true && option.profit < 0.0) {
							color = "bg-red-800";
						}

						return (
							<tr key={option.id}>
								<td className={`table-items ${color}`}>{option.ticker}</td>
								<td className={`table-items ${color}`}>
									{option.contract_type}
								</td>
								<td className={`table-items ${color}`}>
									{option.position_type}
								</td>
								<td className={`table-items ${color}`}>{option.expiration}</td>
								<td className={`table-items ${color}`}>
									$ {option.strike_price}
								</td>
								<td className={`table-items ${color}`}>{option.quantity}</td>
								<td className={`table-items ${color}`}>
									$ {option.open_price}
								</td>
								<td className={`table-items ${color}`}>
									$ {option.closing_price}
								</td>
								<td className={`table-items ${color}`}>{option.date_opened}</td>
								<td className={`table-items ${color}`}>{option.date_closed}</td>
								<td className={`table-items ${color}`}>{option.closed}</td>
								<td className={`table-items ${color}`}>$ {option.fees}</td>
								<td className={`table-items ${color}`}>
									{option.profit !== null && <span>$ </span>}
									{option.profit}
								</td>
								<td className={`table-items   ${color}`}>
									<div className="flex justify-center">
										<Link href="/edit">
											<PencilSquareIcon className="h-6 w-6" />
										</Link>
									</div>
								</td>
								<td className={`table-items  ${color}`}>
									<div className="flex justify-center">
										<a
											className="hover:cursor-pointer"
											onClick={() => {
												setDeleteRow(option);
												setShowModal(true);
											}}
										>
											<TrashIcon className="h-6 w-6" />
										</a>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="fixed inset-0 bg-black opacity-50 "></div>
					<div className="relative bg-neutral-800 rounded p-8">
						<h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
						<p>Are you sure you want to delete this row?</p>
						<div className="mt-6 flex justify-end">
							<button
								className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-all"
								onClick={() => {
									// Perform the deletion logic
									handleDelete(deleteRow);
									setDeleteRow(null);
									setShowModal(false);
								}}
							>
								Delete
							</button>
							<button
								className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
								onClick={() => {
									setDeleteRow(null);
									setShowModal(false);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{showSuccessModal && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="fixed inset-0 bg-black opacity-50 "></div>
					<div className="relative bg-neutral-700 rounded p-8">
						{deleteStatus === "success" && (
							<p className="text-green-600 text-lg font-bold">
								Delete successful!
							</p>
						)}
						{deleteStatus === "error" && (
							<div>
								<p className="text-red-600 text-lg font-bold">
									An error occured during the delete process.
								</p>
								<button
									className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
									onClick={() => {
										setShowSuccessModal(false);
										setDeleteStatus("");
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
		</div>
	);
};

export default Overview;
