"use client";

export function LargeTextInput({ id, label, placeholder, defaultValue }: { id: string, label?: string, placeholder: string, defaultValue?: string}) {

    return (
        <div className="flex flex-col p-4 h-full">
            {label && (
        <p className="py-[9px]">{label}</p>
            )}
            <div className={`w-full flex-grow`}>
                <textarea
                    id={id}
                    name={id}
                    className="peer block w-full h-full rounded-md border border-gray-200 p-[9px] text-sm outline-2 placeholder:text-gray-500 font-mono resize-none"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
            </div>
        </div>
    );
}