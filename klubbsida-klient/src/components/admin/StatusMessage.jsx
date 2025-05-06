import React from 'react';

/**
 * Component for displaying status messages (errors, success messages)
 */
export default function StatusMessage({ error, adminMessage, loading }) {
  return (
    <>
      {loading && <p className="text-gray-600">Loading...</p>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-2xl">
          <p>{error}</p>
        </div>
      )}
      
      {adminMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 w-full max-w-2xl">
          <p>{adminMessage}</p>
        </div>
      )}
    </>
  );
}