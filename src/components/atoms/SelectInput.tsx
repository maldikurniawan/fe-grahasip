import React from 'react';

interface SelectInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    onBlur: React.FocusEventHandler<HTMLSelectElement>;
    options: { label: string; value: string }[];
    error: string | boolean | undefined;
    required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    options,
    error,
    required = false,
}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-[#42526B] font-normal tracking-wide text-sm">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`p-2 px-2 border ${error ? "border-red-500" : "border-gray-300"
                    } rounded-md text-sm bg-transparent text-[#42526B] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none transition-colors`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
};

export default SelectInput;
