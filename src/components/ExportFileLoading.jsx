import React, { useState } from "react";
import Lottie from "lottie-react";
import hourGlassLoading from "../assets/HOUR GLASS.json";
import { useTranslation } from "react-i18next";

const ExportFile = () => {
    const [loading, setLoading] = useState(false);
    const{t}=useTranslation("settings")

    const handleExport = async () => {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 3000));
        setLoading(false);
        alert("File exported successfully ✅");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Lottie
                animationData={hourGlassLoading}
                loop={true}
                className="size-20"
            />

            <p
                onClick={handleExport}
                disabled={loading}
                className="font-medium text-sm text-center">{t("settings:preparing_export")}</p>
        </div>
    );
};

export default ExportFile;