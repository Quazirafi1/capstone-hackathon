"use client";

import { useState } from "react";



interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    shrinkWrap?: boolean;
}

export function CheckBox({ id, defaultChecked } : {id: string, defaultChecked: boolean}) {
    const [checked, setChecked] = useState(defaultChecked)

    const handleChange = () => {
        setChecked(!checked);
      };

    return (
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-500"
        />
    );
}