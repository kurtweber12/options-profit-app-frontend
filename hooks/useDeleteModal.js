import { useState } from "react";

const useDeleteModal = () => {
	const [showModal, setShowModal] = useState(false);
	const [deleteRow, setDeleteRow] = useState(null);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [deleteStatus, setDeleteStatus] = useState("");

	return {
		showModal,
		setShowModal,
		deleteRow,
		setDeleteRow,
		showSuccessModal,
		setShowSuccessModal,
		deleteStatus,
		setDeleteStatus,
	};
};

export default useDeleteModal;
