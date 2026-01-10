"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

import { Eye, EyeOff } from "lucide-react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  subText?: string;
  isRequired?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, subText, isRequired, className, type, ...props }, ref) => {
    const [onFocus, setOnFocus] = useState(false);
    const [value, setValue] = useState(!!props.value || !!props.defaultValue);
    const [showPassword, setShowPassword] = useState(false);

    const isFloating = onFocus || value;
    const isPasswordType = type === "password";

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setOnFocus(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setOnFocus(false);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(!!e.target.value);
      props.onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={cn("relative w-full", className)}>
        <div className="relative font-inter flex items-center">
          <input
            ref={ref}
            {...props}
            type={isPasswordType ? (showPassword ? "text" : "password") : type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              "w-full px-5 pt-2.5 pb-2 text-base bg-transparent rounded-lg border transition-colors duration-200",
              "outline-none primary-border rounded-[1.25rem] placeholder:text-transparent border-[1.5px] h-[48px] md:h-[68px]",
              isPasswordType && "pr-14",
              onFocus
                ? "border-primary"
                : error
                ? "border-error"
                : ""
            )}
            placeholder={label}
          />
          
          <label
            className={cn(
              "absolute left-5 px-1 pointer-events-none transition-all duration-200 ease-out bg-background ",
              isFloating
                ? "top-0 -translate-y-1/2 text-xs font-medium"
                : "top-1/2 -translate-y-1/2 text-base",
              onFocus
                ? "text-primary"
                : error
                ? "text-error"
                : ""
            )}
          >
            {label}
            {isRequired ? <span className="text-error">*</span> : ""}
          </label>

          {isPasswordType && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 p-2 focus:outline-none text-sub hover:text-primary transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={20} color="#737677" className="md:w-6 md:h-6" />
              ) : (
                <Eye size={20} color="#737677" className="md:w-6 md:h-6" />
              )}
            </button>
          )}
        </div>
        
        {(error || subText) && (
          <p
            className={cn(
              "mt-1.5 text-base px-5 font-inter tracking-wide text-[hsl(var(--secondary-text-color))]",
              error ? "text-error" : ""
            )}
          >
            {error || subText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };