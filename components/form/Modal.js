import React from "react";
import Router, { useRouter } from "next/router";

const Modal = ({
	showSuccessModal,
	setShowSuccessModal,
	addStatus,
	setAddStatus,
	modalMessage,
	setModalMessage,
}) => {
	const router = useRouter();
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="fixed inset-0 bg-black opacity-50 "></div>
			<div className="relative bg-neutral-700 rounded p-8">
				{addStatus === "success" && (
					<div className="flex flex-col items-center">
						<p className="text-green-600 text-lg font-bold">
							{/* Add contract successful! */}
							{modalMessage}
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
							{/* An error occured during the add contract process. */}
							{modalMessage}
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
	);
};

export default Modal;
