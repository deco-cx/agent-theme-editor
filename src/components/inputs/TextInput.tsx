import React, { useEffect, useState } from "react";
import { ValidationError } from "../../types/ValidationError";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

interface TextInputProps {
    label: string;
    value: string;
    path: string[];
    onValueChange: (path: string[], value: string) => void;
    onError?: (error: ValidationError | null) => void;
    getError?: (path: string[]) => ValidationError | null;
    placeholder?: string;
    type?: "text" | "number" | "url";
    validate?: (value: string) => ValidationError | null;
}

export const TextInput: React.FC<TextInputProps> = ({
    label,
    value,
    path,
    onValueChange,
    onError,
    getError,
    placeholder,
    type = "text",
    validate,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const error = getError?.(path);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    };

    const handleBlur = () => {
        const validationError = validate?.(inputValue);
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
            <Label htmlFor={`text-${path.join("-")}`}>
                {label}
            </Label>
            <Input
                id={`text-${path.join("-")}`}
                type={type}
                value={inputValue}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={cn(
                    error && "border-red-500 focus-visible:ring-red-200",
                )}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};
