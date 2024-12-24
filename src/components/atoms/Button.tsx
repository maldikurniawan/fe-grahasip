import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    color?: string; // Background color
    textColor?: any;
    variant?: "solid" | "flat"; // Type of button
    rounded?: any;
    size?: any;
    children: React.ReactNode; // Button content (text or other components)
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    onClick,
    disabled = false,
    loading = false,
    className = "",
    color = "#4479BC", // default color
    textColor = "white", // default text color
    variant = "solid",
    rounded = "md",
    size = "md",
    children,
}) => {
    const getSize = () => {
        switch (size) {
            case "sm":
                return "py-1 px-3 text-sm";
            case "lg":
                return "py-3 px-6 text-lg";
            default:
                return "py-2 px-4 text-base";
        }
    };

    const getVariant = () => {
        if (variant === "flat") {
            return `border-2 border-${color} text-${color} bg-transparent hover:bg-${color} hover:text-white`;
        }
        return `bg-[${color}] text-${textColor} hover:bg-[${color}]`;
    };

    const getRounded = () => {
        switch (rounded) {
            case "none":
                return "rounded-none";
            case "sm":
                return "rounded-sm";
            case "md":
                return "rounded-md";
            case "lg":
                return "rounded-lg";
            case "xl":
                return "rounded-xl";
            default:
                return "rounded-md";
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading || disabled}
            className={`w-full ${getSize()} ${getVariant()} ${getRounded()} font-bold transition-colors ${className} 
        ${disabled ? "cursor-not-allowed" : ""}`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};

export default Button;
