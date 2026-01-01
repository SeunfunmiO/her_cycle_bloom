import React, { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const {data} = await axios.post(`https://her-cycle-bloom-backend.onrender.com/user/forgot-password`,
                { email }
            )

            if (!data.success) {
                setMessage(data.message || "Error sending reset password link")
            } else {
                setMessage(data.message || "Reset link sent. Check your email.")
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Try again."
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white dark:bg-neutral-900 min-h-screen flex items-center">
            <form
                onSubmit={handleForgotPassword}
                className="max-w-md mx-auto w-full space-y-4"
            >
                <div className="flex flex-col gap-2 text-neutral-900 dark:text-neutral-100">
                    <label className="text-base font-medium" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="border border-black dark:border-neutral-100 rounded-lg py-3 px-2 w-full bg-transparent"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-palevioletred text-white py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Send reset link"}
                </button>

                {message && (
                    <p className="text-sm text-center text-neutral-700 dark:text-neutral-300">
                        {message}
                    </p>
                )}
            </form>
        </div>
    )
}

export default ForgotPassword
