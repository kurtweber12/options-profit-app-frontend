import React, { useEffect, useState } from "react";
import {
	httpGetAllOptions,
	httpDeleteOption,
	httpGetSingleOption,
} from "@/utils/requests";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import Graphs from "./Graphs";
import DeleteModal from "./DeleteModal";
import useDeleteModal from "@/hooks/useDeleteModal";

const Overview = () => {
	const {
		showModal,
		setShowModal,
		deleteRow,
		setDeleteRow,
		showSuccessModal,
		setShowSuccessModal,
		deleteStatus,
		setDeleteStatus,
	} = useDeleteModal();

	const [httpOptions, setHttpOptions] = useState([]);

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

	const handleDelete = async () => {
		const deleteOption = deleteRow;
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
			<Graphs optionsData={httpOptions} />
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
										<Link href={`/edit/${option.id}`}>
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

			<DeleteModal
				showModal={showModal}
				setShowModal={setShowModal}
				setDeleteRow={setDeleteRow}
				showSuccessModal={showSuccessModal}
				setShowSuccessModal={setShowSuccessModal}
				deleteStatus={deleteStatus}
				setDeleteStatus={setDeleteStatus}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default Overview;
