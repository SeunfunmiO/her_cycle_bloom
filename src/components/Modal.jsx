import React, { useState } from "react";

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            Button to open modal
            <button
                onClick={() => setIsOpen(true)}
                className="px-5 py-2 bg-palevioletred text-white rounded-lg hover:bg-pink-600 transition"
            >
                Open Modal
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)} // Close when clicking backdrop
                >
                    {/* Modal Box */}
                    <div
                        className="bg-white rounded-2xl shadow-lg w-11/12 max-w-md p-6 relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
                    >
                        <h2 className="text-lg font-bold text-gray-800">Confirm Action</h2>
                        <p className="text-gray-600 mt-2">
                            Are you sure you want to perform this action?
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert("Action confirmed!");
                                    setIsOpen(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-palevioletred text-white hover:bg-pink-600"
                            >
                                Confirm
                            </button>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;