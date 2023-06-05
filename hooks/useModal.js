import { useState } from "react";

// hook for form/Modal.js
const useModal = () => {
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [addStatus, setAddStatus] = useState("");
	const [modalMessage, setModalMessage] = useState("");

	return {
		showSuccessModal,
		setShowSuccessModal,
		addStatus,
		setAddStatus,
		modalMessage,
		setModalMessage,
	};
};

export default useModal;
