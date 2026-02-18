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
import axios from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const DateofBirth = ({ value, onChange }) => {
    const [open, setOpen] = useState(false)
    const{t}=useTranslation([
        "placeholder"
    ])

    const handleSave = async (formattedDate) => {
        try {
            const res = await axios.put(
                `${import.meta.env.APP_URL}/user/create-profile`,
                { dateOfBirth: formattedDate },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            if (res.status !== 200) {
                toast.error("Failed to edit date of birth")
                return
            }

            toast.success("Date of birth updated successfully")

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="flex items-center justify-between">
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
                        {value ? new Date(value).toLocaleDateString() : t("placeholder:select_date")}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        className="w-80 outline-0 border border:neutral-50 bg-white dark:bg-neutral-800 dark:border-neutral-800"
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        captionLayout="dropdown"
                        fromYear={1950}
                        toYear={new Date().getFullYear()}
                        onSelect={async (date) => {
                            if (!date) return;

                            const formatted = date.toISOString().split("T")[0];

                            onChange(formatted);  

                            await handleSave(formatted);

                            setOpen(false);
                        }}

                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateofBirth
