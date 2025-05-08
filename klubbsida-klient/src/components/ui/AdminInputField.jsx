import React from 'react';
import PropTypes from 'prop-types';



export function AdminInputField({  
    label,
    name,
    placeholder,
    onChange,
    value,
    type,
    error }) {

        return (
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
                {error && <p className="error-message">{error}</p>}
            </div>
        );
        }
    
    AdminInputField.propTypes = {
        label: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        error: PropTypes.string,
    };
    