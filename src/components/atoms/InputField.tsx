import React from "react";

interface InputFieldProps {
    label: string;
    id: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    touched: any;
    error: string | undefined;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    touched,
    error,
    required = false,
}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-[#42526B] font-normal tracking-wide text-sm">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`p-2 px-4 border ${touched && error ? "border-red-500" : "border-gray-300"
                    } rounded-md text-sm bg-transparent text-[#42526B] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-none transition-colors`}
            />
            {touched && error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
};

export default InputField;
