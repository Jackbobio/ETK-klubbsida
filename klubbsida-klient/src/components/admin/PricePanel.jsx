import React from "react";
import AdminHeading from "../ui/AdminHeading";
import { AdminInputField } from "../ui/AdminInputField";

/*
    * Component for managing prices such as membership fees and event costs.
    * This component allows admins to view and update prices.
    */

export default function PricePanel({
    priceForm,
    setPriceForm,
    prices,
    setPrices,
}) {

    // Handle price updates
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPriceForm(prev => ({ ...prev, [name]: value }));
    }

    return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
        <form action="onSubmit"></form>
        <AdminHeading title="Prices" />
        <p className="text-gray-700 text-sm mb-4">Manage prices for membership fees and events.</p>
        <AdminInputField 
            label="testinput"
            name="Testinput"
            placeholder="Testplaceholder"
            value={priceForm.testinput}
            onChange={handleOnChange}
            
        />
    </div>
    );
}