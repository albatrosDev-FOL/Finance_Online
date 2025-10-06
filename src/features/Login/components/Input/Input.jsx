import React from 'react';
import "./Input.css";

function Input({ 
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  error,
  label,
  id,
  className = "",
  ariaLabel,
  autoComplete = "off",
  ...props 
}) {
  
  const inputId = id || name;
  const hasError = !!error;
  
  return (
    <div className={`inputs ${hasError ? 'inputs-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required-asterisk"> *</span>}
        </label>
      )}
      
      <input            
        id={inputId}
        type={type}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        aria-label={ariaLabel || label}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
        aria-invalid={hasError}
        className={`input-field ${hasError ? 'input-field-error' : ''}`}
        {...props}
      />
      
      {hasError && (
        <span 
          id={`${inputId}-error`} 
          className="error-message" 
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;