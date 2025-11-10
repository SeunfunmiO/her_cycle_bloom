import React from 'react'

const LabelProps = ({title}) => {
    return (
        <div className="border rounded-2xl border-pink-200 relative flex justify-center gap-2 flex-col h-12 px-2">
            <input
                className='outline-none peer px-2'
                type="password"
                name='password'
            />
            <label
                className='text-pink-200 text-sm absolute bg-white peer-focus:-top-5 peer-focus:text-sm transition-all
                                 pointer-events-none left-2 p-2 lg:text-base'
                htmlFor="account-password">{title}
            </label>
        </div>
    )
}

export default LabelProps