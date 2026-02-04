import React from 'react'

const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-3">
        <span
            className={`w-4 h-4 rounded-full ${color}`}
        />
        <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {label}
        </span>
    </div>
)

const CalendarLegend = () => {
        return (
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 shadow space-y-3">
                <LegendItem color="bg-palevioletred" label="Period" />
                <LegendItem color="border-red-400 border border-dashed text-white rounded-full"  label="Predicted period" />
                <LegendItem color="border border-dashed border-green-300 bg-transparent text-white rounded-full" label="Ovulation" />
                <LegendItem color="bg-green-300" label="Fertile window" />
            </div>
        )
}

export default CalendarLegend