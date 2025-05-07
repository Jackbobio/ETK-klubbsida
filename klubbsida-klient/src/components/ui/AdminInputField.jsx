import React from 'react';
import PropTypes from 'prop-types';



export function AdminInputField({  
    label,
    placeholder,
    value,
    error }) {

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setNewsForm(prev => ({ ...prev, [name]: value }));
          };

        return (
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>{label}</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id={label}
                    value={value}
                    onChange={(e) => setLabel(e.target.value)}
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
    