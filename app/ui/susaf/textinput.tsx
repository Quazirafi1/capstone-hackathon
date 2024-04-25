"use client";

export function TextInput({ id, label, placeholder, defaultValue, input_width_percentage }: { id: string, label?: string, placeholder: string, defaultValue?: string, input_width_percentage?: number }) {
    input_width_percentage = input_width_percentage ?? 100;

    return (
        <div className="relative flex items-center p-4">
            {label && (
                <div className="flex-grow p-[9px]">{label}</div>
            )}
            <div className={`w-[${input_width_percentage}%]`}>
                <input
                    id={id}
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    );
}