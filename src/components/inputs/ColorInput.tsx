import React, { useEffect, useState } from "react";
import { ValidationError } from "../../types/ValidationError";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

interface ColorInputProps {
    label: string;
    value: string;
    path: string[];
    onValueChange: (path: string[], value: string) => void;
    onError?: (error: ValidationError | null) => void;
    getError?: (path: string[]) => ValidationError | null;
}

export const ColorInput: React.FC<ColorInputProps> = ({
    label,
    value,
    path,
    onValueChange,
    onError,
    getError,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const error = getError?.(path);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const validateHexColor = (color: string): ValidationError | null => {
        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
            return {
                message: "Invalid hex color code",
                path,
            };
        }
        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };

    const handleBlur = () => {
        const validationError = validateHexColor(inputValue);
        if (validationError) {
            onError?.(validationError);
            setInputValue(value); // Reset to last valid value
            return;
        }
        onError?.(null);
        onValueChange(path, inputValue);
    };

    return (
        <div className="flex flex-col space-y-1">
            <Label htmlFor={`color-${path.join("-")}`}>
                {label}
            </Label>
            <div className="flex space-x-2">
                <div className="relative">
                    <div
                        className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer flex items-center justify-center"
                        style={{ backgroundColor: inputValue }}
                    />
                    <input
                        type="color"
                        id={`color-${path.join("-")}`}
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                        "flex-1",
                        error && "border-red-500 focus-visible:ring-red-200",
                    )}
                    placeholder="#000000"
                />
            </div>
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};
