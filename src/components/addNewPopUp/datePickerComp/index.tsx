"use client";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function DatePickerComp({ startDate, setStartDate }: any) {
    const [cleared, setCleared] = React.useState(false);

    React.useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => setCleared(false), 1500);
            setStartDate(null);
            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className=" relative">
                <DesktopDatePicker
                    className="w-full"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    format="DD-MM-YYYY"
                    slotProps={{
                        field: {
                            clearable: true,
                            onClear: () => setCleared(true),
                        },
                    }}
                />
            </div>
        </LocalizationProvider>
    );
}
