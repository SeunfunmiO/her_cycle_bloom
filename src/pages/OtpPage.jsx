import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '../components/ui/input-otp';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

   
    const params = new URLSearchParams(location.search);
    const email = params.get("email");

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post('https://her-cycle-bloom-backend.onrender.com/user/verify-otp', {
                email,
                otp
            });

            if (res.data.success) {
                navigate(`/reset-password?token=${res.data.token}`);
            } else {
                setMessage(res.data.message);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-900 min-h-screen flex items-center">
            <form onSubmit={handleVerifyOtp} className="max-w-md mx-auto w-full space-y-4">
                <div className="flex flex-col gap-2 text-neutral-900 dark:text-neutral-100">
                    <label className="text-base font-medium">Enter OTP</label>
                    <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-palevioletred text-white py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {message && <p className="text-sm text-center text-neutral-700 dark:text-neutral-300">{message}</p>}
            </form>
        </div>
    );
};

export default OtpPage;
