import { useState } from "react";

const useModal = () => {
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [addStatus, setAddStatus] = useState("");

	return { showSuccessModal, setShowSuccessModal, addStatus, setAddStatus };
};

export default useModal;
