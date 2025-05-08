import React from "react";
import PropTypes from "prop-types";
import AdminHeading from "../ui/AdminHeading";
import { AdminInputField } from "../ui/AdminInputField";
import { useEffect } from "react";

/*
    * Component for managing prices such as membership fees and event costs.
    * This component allows admins to view and update prices.
    */

export default function PricePanel({
    prices,
    editedPrices,
    setEditedPrices,
    handlePricesRequest,
    handlePricesUpdate,
    loading,
    setError,
    setAdminMessage,
}) {

    // Fetch prices when the component mounts
    useEffect(() => {
        handlePricesRequest();
    }, []);

    // Handle change in price input fields
    const handleOnChange = (index, newValue) => {
        setEditedPrices((prevPrices) => {
            const updatedPrices = [...prevPrices];
            updatedPrices[index].price = newValue;
            return updatedPrices;
        });
    }



    PricePanel.propTypes = {
        prices: PropTypes.array.isRequired, 
        editedPrices: PropTypes.array.isRequired,
        setPrices: PropTypes.func.isRequired,
        handlePricesRequest: PropTypes.func,
        handlePricesUpdate: PropTypes.func,
        loading: PropTypes.bool,
        setError: PropTypes.func,
        setAdminMessage: PropTypes.func,
    };
    
    return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
    <form>
        <AdminHeading title="Prices" />
        <p className="text-gray-700 text-sm mb-4">Manage prices for membership fees and events.</p>
        {prices.map((price, index) => (
        <div key={price.item} className="mb-4">
        <AdminInputField 
            label={price.item + " - Pris nuvarande: " + price.price + " kr"}
            name="Input1"
            type="number"
            value={price.edi}
            onChange={(e) => handleOnChange(index, e.target.value)}
        />
        </div>
        ))}
    </form>
    </div>
    );

    
}