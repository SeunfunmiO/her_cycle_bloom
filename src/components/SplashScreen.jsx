import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
    const [phase, setPhase] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(2), 600);
        const t2 = setTimeout(() => setPhase(3), 1200);
        const t3 = setTimeout(() => setPhase(4), 1800);
        const t4 = setTimeout(() => navigate("/onboarding"), 2500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [navigate]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-700
      ${phase === 1 ? "bg-palevioletred" : ""}
      ${phase === 2 ? "bg-lavender" : ""}
      ${phase === 3 ? "bg-lavender" : ""}
      ${phase === 4 ? "bg-white" : ""}
    `}
        >
            <img
                src="./LOGO.png"
                alt="HerCycleBloom"
                className={`transition-opacity duration-700 
        ${phase === 3 ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    );
};

export default SplashScreen;