import React from 'react';
import { useState } from 'react';

export function AdminInputField({  
    label,
    setLabel, 
    error }) {
        return (
            <div className="admin-input-field">
                <label htmlFor={label}></label>
                <input
                    type="text"
                    id="label"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
            </div>
        );

    }