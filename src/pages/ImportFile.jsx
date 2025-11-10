import React, { useEffect, useRef, useState } from "react";
import { FileText, FileSpreadsheet, FileType, X, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ImportFile = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const navigate = useNavigate();
    const intervalRef = useRef(null);

    const startUpload = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 5;
                if (next >= 100) {
                    clearInterval(intervalRef.current);
                    setUploading(false);
                    setDone(true);
                    return 100;
                }
                return next;
            });
        }, 300);
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setFile(selected);
            setProgress(0);
            setIsPaused(false);
            setUploading(true);
            setDone(false);
            startUpload();
        }
    };

    const handlePause = () => {
        if (!file || done) return;

        if (isPaused) {
            setIsPaused(false);
            setUploading(true);
            startUpload();
        } else {
            setIsPaused(true);
            setUploading(false);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleRemove = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setFile(null);
        setProgress(0);
        setIsPaused(false);
        setUploading(false);
        setDone(false);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const getFileIcon = (fileName) => {
        const ext = fileName.split(".").pop().toLowerCase();
        switch (ext) {
            case "pdf":
                return <FileText size={20} className="text-red-500" />;
            case "doc":
            case "docx":
                return <FileType size={20} className="text-blue-500" />;
            case "xls":
            case "xlsx":
                return <FileSpreadsheet size={20} className="text-green-500" />;
            default:
                return <FileType size={20} className="text-gray-500" />;
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <div className="flex items-center justify-between mb-8 mt-10">
                <img
                    onClick={() => navigate(-1)}
                    src="./Arrow Left.svg"
                    alt="back"
                    className="cursor-pointer"
                />
                <h1 className="font-bold text-lg w-full text-center">Import Data</h1>
            </div>
            <hr className="border-gray-200" />

            <p className="text-sm text-gray-600 mb-6 mt-8 font-medium">
                Upload a <span className="font-bold">.pdf, .docx or .xlsx</span> file up to 100MB.
            </p>

            {!file ? (
                <label
                    htmlFor="file-upload"
                    className="border-2 border-dashed border-pink-300 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition"
                >
                    <img src="./upload.jpg" alt="Import" />
                    <div className="flex items-center gap-2 mt-2 text-sm">
                        <h1 className="font-bold text-[#9d2f54] underline">Click here</h1>
                        <span className="font-medium text-gray-400">to browse file to import</span>
                    </div>
                </label>
            ) : (
                <div className="border border-pink-300 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {getFileIcon(file.name)}
                            <span className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                                {file.name}
                            </span>
                        </div>
                        <div className="flex gap-2 items-center">
                            {!done && (
                                <button
                                    onClick={handlePause}
                                    aria-label={isPaused ? "Resume upload" : "Pause upload"}
                                    className="transition size-4.5 border border-gray-500 rounded-full text-gray-500 flex items-center justify-center"
                                >
                                    {isPaused ? <Play size={12} /> : <Pause size={12} />}
                                </button>
                            )}
                            <button
                                onClick={handleRemove}
                                className="transition size-4.5 border border-red-500 rounded-full text-red-500 flex items-center justify-center"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-1">
                            {done
                                ? "Upload complete"
                                : isPaused
                                    ? ` Paused at ${progress}%`
                                    : `Uploading... ${progress}% • ${Math.round(
                                        (100 - progress) / 5
                                    )}s remaining`}
                        </p>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-2 rounded-full transition-all duration-200 ${isPaused ? "bg-green-100" : "bg-green-600"
                                    }`}
                                style={{ width: ` ${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )
            }

            <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
            />

            <div className="flex h-100 items-end justify-end">
                <button
                    disabled={!file || (!done && uploading && !isPaused)}
                    className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition ${!file || (!done && uploading && !isPaused)
                            ? "bg-pink-200 cursor-not-allowed"
                            : "bg-palevioletred hover:bg-pink-600"
                        }`}
                >
                    {done ? "Finish" : isPaused ? "Paused" : uploading ? "Uploading..." : "Start Upload"}
                </button>
            </div>
        </div >
    );
};

export default ImportFile;