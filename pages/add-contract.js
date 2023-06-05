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
import useModal from "@/hooks/useModal";
import Modal from "@/components/form/Modal";

const AddContract = () => {
	const router = useRouter();
	const { formValues, handleInputChange, setFormValues } = useForm();
	const {
		showSuccessModal,
		setShowSuccessModal,
		addStatus,
		setAddStatus,
		modalMessage,
		setModalMessage,
	} = useModal();

	// const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [loading, setLoading] = useState(false);
	//const [addStatus, setAddStatus] = useState("");

	const handleSubmit = async (event) => {
		//event.preventDefault();
		setLoading(true);
		console.log(formValues);
		const response = await httpPostNewContract(formValues);
		if (response.ok === false) {
			console.log("error");
			setAddStatus("error");
			setModalMessage("An error occured during the add contract process.");
		} else {
			setAddStatus("success");
			setModalMessage("Add contract successful!");
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
				<Modal
					showSuccessModal={showSuccessModal}
					setShowSuccessModal={setShowSuccessModal}
					addStatus={addStatus}
					setAddStatus={setAddStatus}
					modalMessage={modalMessage}
					setModalMessage={setModalMessage}
				/>
			)}
		</main>
	);
};

export default AddContract;
