import React, { useState } from 'react';

function PricingForm() {
    const [data, setData] = useState({
        total_cost: '',
        profit: '',
        tax: '',
        discount: ''
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/calculate/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        setResult(json);
    };

    return (
        <div className="bg-white shadow-xl p-6 rounded-xl max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">Pricing Calculator</h1>
            <form onSubmit={handleSubmit} className="space-y-3">
                {["total_cost", "profit", "tax", "discount"].map((field) => (
                    <input
                        key={field}
                        name={field}
                        type="number"
                        step="0.01"
                        required
                        placeholder={field.replace('_', ' ').toUpperCase()}
                        className="w-full p-2 border border-gray-300 rounded"
                        value={data[field]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Calculate
                </button>
            </form>

            {result && (
                <div className="mt-4 text-gray-700 space-y-1">
                    <p>Selling Price: ${result.selling_price}</p>
                    <p>Net Price: ${result.net_price}</p>
                    <p className="font-bold">Final Price: ${result.final_price}</p>
                </div>
            )}
        </div>
    );
}

export default PricingForm;
