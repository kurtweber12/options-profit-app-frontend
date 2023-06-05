import React from "react";

const DeleteModal = ({
	showModal,
	setShowModal,
	deleteRow,
	setDeleteRow,
	showSuccessModal,
	setShowSuccessModal,
	deleteStatus,
	setDeleteStatus,
	handleDelete,
}) => {
	if (showModal) {
		return (
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
								handleDelete();
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
		);
	}

	if (showSuccessModal) {
		return (
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
		);
	}
};

export default DeleteModal;
