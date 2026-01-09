import React, { useState } from 'react'
import { Button } from "../../src/components/ui/button"
import { Calendar } from "../../src/components/ui/calendar"
import { Label } from "../../src/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../src/components/ui/popover"
import { ChevronDownIcon } from 'lucide-react'


const DateofBirth = ({value,onChange,onBlur,name}) => {
    const [open, setOpen] = useState(false)


    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 border border-black rounded-lg bg-transparent justify-between font-semibold"
                    >
                        {value ? new Date(value).toLocaleDateString() : "Select date"}
                        {name}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        className="w-70 outline-0"
                        mode="single"
                        selected={value ? new Date(value):"Undefined"}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            if (date) {
                                const formatted = date.toISOString().split("T")[0];
                                onChange({ target: { name: "dateOfBirth", value: formatted } });
                            }
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>

            {onBlur && (
                <small className="text-red-600">
                  </small>
                    )}
               
        </div>
    )
}

export default DateofBirth