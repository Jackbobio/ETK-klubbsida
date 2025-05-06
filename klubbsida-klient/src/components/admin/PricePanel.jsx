import React from "react";
import AdminHeading from "../ui/AdminHeading";
import { useState } from "react";
import { useApi } from "../../utils/api";

/*
    * Component for managing prices such as membership fees and event costs.
    * This component allows admins to view and update prices.
    */

export default function PricePanel({
    prices,
    setPrices,
    updatePrice,
    deletePrice,
    addPrice,
    error,
    setError,
    loading,
    adminMessage
}) {

    // Handle price updates


    return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
        <AdminHeading title="Prices" />
        <p className="text-gray-700 text-sm mb-4">Manage prices for membership fees and events.</p>
    </div>
    );
}