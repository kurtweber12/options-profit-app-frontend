import {
	httpGetNewOptionDropdown,
	httpPostNewContract,
} from "@/utils/requests";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BarLoader } from "react-spinners";
import Form from "@/components/form/Form";
import useForm from "@/hooks/useForm";

const AddContract = () => {
	const router = useRouter();
	const { formValues, handleInputChange, setFormValues } = useForm();

	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [addStatus, setAddStatus] = useState("");

	const handleSubmit = async (event) => {
		//event.preventDefault();
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

			<Form
				onSubmit={handleSubmit}
				handleInputChange={handleInputChange}
				formValues={formValues}
				setFormValues={setFormValues}
			/>
			<div className="flex justify-center">
				<BarLoader color={"#437856"} loading={loading} size={20} />
			</div>
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
										//window.location.reload(false);
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
