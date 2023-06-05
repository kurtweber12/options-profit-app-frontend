import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

import { httpGetSingleOption, httpPutSingleOption } from "@/utils/requests";

import Form from "@/components/form/Form";
import useForm from "@/hooks/useForm";
import Modal from "@/components/form/Modal";
import useModal from "@/hooks/useModal";

const Edit = () => {
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

	const id = router.query.slug;
	const [loading, setLoading] = useState(false);
	const [optionsDataState, setOptionsDataState] = useState(null);

	useEffect(() => {
		const fetchSingleOption = async (id) => {
			try {
				const optionData = await httpGetSingleOption(id);
				setFormValues({
					ticker: optionData.ticker,
					contract_type: optionData.contract_type,
					position_type: optionData.position_type,
					expiration: optionData.expiration,
					strike_price: optionData.strike_price,
					quantity: optionData.quantity,
					open_price: optionData.open_price,
					date_opened: optionData.date_opened,
					date_closed: optionData.date_closed,
					closing_price: optionData.closing_price,
					closed: optionData.closed,
					fees: optionData.fees,
				});
				setOptionsDataState(optionData);
			} catch (error) {
				console.log(error);
			}
		};

		if (id) {
			fetchSingleOption(id);
		}
	}, [id]);

	const handleSubmit = async () => {
		setLoading(true);

		const response = await httpPutSingleOption(id, formValues);
		console.log(formValues);
		if (response.ok === false) {
			setLoading(false);
			console.log("error");
			setAddStatus("error");
			setModalMessage("An error occured during the edit contract process.");
		} else if (response.ok === true) {
			setAddStatus("success");
			console.log("success");
			console.log(response);
			setModalMessage("Edit contract successful!");
		}
		setLoading(false);
		setShowSuccessModal(true);
	};

	return (
		<main className="flex flex-col h-screen p-24 items-center">
			<h1 className="text-3xl font-thin tracking-widest mb-4 border-b border-gray-800 pb-2 px-8">
				UPDATE CONTRACT
			</h1>
			{optionsDataState && (
				<div>
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
				</div>
			)}
		</main>
	);
};

export default Edit;
