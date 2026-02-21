import React from 'react'

const FlowIntensityRange = ({ flow }) => {
    const getFlowPercentage = () => {
        switch (flow) {
            case "Light":
                return 30;
            case "Medium":
                return 60;
            case "Heavy":
                return 100;
            default:
                return 0;
        }
    }

    const percentage = getFlowPercentage()

    return (
        <div className='flex items-center gap-3 w-full'>
            <div className='flex-1 h-3 bg-gray-200 rounded-full overflow-hidden'>
                <div className='h-full rounded-full bg-linear-to-r from-indigo-700 to-blue-500
               transition-all duration-500 ease-in-out '
               style={{width:`${percentage}%`}}
                />
            </div>
            <span className='text-sm font-semibold text-gray-600'>
                {percentage}%
            </span>
        </div>
    )
}

export default FlowIntensityRange