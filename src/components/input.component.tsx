"use client";

import { ComponentProps, forwardRef, useId } from "react";

interface InputProps {
  label?: string;
  type?: ComponentProps<"input">["type"];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name: string;
  onBlur: ComponentProps<"input">["onBlur"];
  onChange: ComponentProps<"input">["onChange"];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", error, ...inputProps }: InputProps,
  ref
) {
  const id = useId();

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ref={ref}
        {...inputProps}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Oops!</span> {error}
        </p>
      )}
    </div>
  );
});
