import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
}

function Input({
  type = "text",
  name = "",
  placeholder = "",
  value = "",
  onChange,
  className = "",
  label = "",
  error = "",
  disabled = false,
  ...props
}: InputProps) {
  const inputClasses = `placeholder:text-gray-400 py-1.5 px-4 border rounded border-gray-400 outline-2 outline-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${className || ""}`;

  return (
    <div>
      {label && (
        <label className="block text- font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        disabled={disabled}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default Input;
