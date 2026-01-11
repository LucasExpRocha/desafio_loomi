"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <label
        className={cn(
          "font-space-grotesk inline-flex items-center gap-2 font-size-lg text-primary-color cursor-pointer select-none font-medium",
          className
        )}
      >
        <input
          type="checkbox"
          className={cn(
            "appearance-none w-[22px] h-[22px] rounded-[5px] border border-slate-600 relative",
            "transition-colors checked:bg-[#c7dd65] checked:border-[#c7dd65] checked:after:content-['✓']",
            "after:content-[''] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-[#0e1626] after:text-[16px]"
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        <span className="text-primary-color font-size-lg font-space-grotesk">{label}</span>
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export default Checkbox
