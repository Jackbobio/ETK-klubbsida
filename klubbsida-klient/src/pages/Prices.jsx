import React, { useEffect, useState } from 'react';
import { useApi } from '../utils/api';

const PRICE_LABELS = {
    'membership-fee': 'Medlemsavgift',
    'junior-fee': 'Juniormedlemskap',
    'senior-fee': 'Seniormedlemskap',
    'family-fee': 'Familjemedlemskap',
    'company-fee': 'Företag',
    'punchcard': 'Klippkort',
    'court-rental': 'Banhyra',
    'guest-fee': 'Gästavgift',
    'gym-fee': 'Gymavgift',
    // Lägg till fler etiketter vid behov
};

const CATEGORY_MAP = {
    'membership': ['membership-fee', 'junior-fee', 'senior-fee', 'family-fee', 'company-fee'],
    'court': ['court-rental', 'guest-fee', 'punchcard'],
    'training': ['gym-fee'],
};

export default function Prices() {
    const [prices, setPrices] = useState([]);
    const { get } = useApi();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleGetPrices = async () => {
            try {
                const response = await get('/prices');
                setPrices(response);
            } catch {
                setError('Kunde inte hämta priser.');
            } finally {
                setLoading(false);
            }
        }
        handleGetPrices();
    }, [get]);

    return (
        <div className="max-w-5xl mx-auto bg-white p-6 mt-8 font-bodoni">
            <h1 className="text-3xl font-bold mb-8 text-center">Priser & Bokning</h1>
            <p className="mb-10 text-center text-gray-700">Här hittar du aktuella priser för medlemskap, banhyra och träning. Kontakta oss gärna om du har frågor på <a href="mailto:info@etktennis.se" className="text-blue-600 underline">info@etktennis.se</a>
            </p>
            {loading ? (
                <p>Laddar priser...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : prices.length === 0 ? (
                <p>Inga priser tillgängliga.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
                    {/* Medlemskap */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">Medlemskap</h2>
                        <ul className="space-y-2">
                            {CATEGORY_MAP.membership.map(item => {
                                const price = prices.find(p => p.item === item);
                                return price ? (
                                    <li key={item} className="flex justify-between border-b border-gray-200 pb-1">
                                        <span>{PRICE_LABELS[item] || item}</span>
                                        <span className="font-semibold">{price.price} kr</span>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                    {/* Banhyra & Gästspel */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">Banhyra & Gästspel</h2>
                        <ul className="space-y-2">
                            {CATEGORY_MAP.court.map(item => {
                                const price = prices.find(p => p.item === item);
                                return price ? (
                                    <li key={item} className="flex justify-between border-b border-gray-200 pb-1">
                                        <span>{PRICE_LABELS[item] || item}</span>
                                        <span className="font-semibold">{price.price} kr</span>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                    {/* Träning */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-center">Träning</h2>
                        <ul className="space-y-2">
                            {CATEGORY_MAP.training.map(item => {
                                const price = prices.find(p => p.item === item);
                                return price ? (
                                    <li key={item} className="flex justify-between border-b border-gray-200 pb-1">
                                        <span>{PRICE_LABELS[item] || item}</span>
                                        <span className="font-semibold">{price.price} kr</span>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                </div>
            )}
            <div className="mt-16 text-base text-gray-800 border-t border-gray-300 pt-8 max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold mb-4 text-center">Bokningsvillkor</h3>
                <ul className="list-disc list-inside space-y-2">
                    <li>Medlemmar kan boka bana via vår <a rel='noreferrer' target='_blank' href="https://www.matchi.se/facilities/ellagardstk" className='text-amber-700 hover:text-amber-500'>Matchi</a></li>
                    <li>Bokning av bana kan göras upp till 7 dagar i förväg.</li>
                    <li>Avbokning måste ske senast 24 timmar innan bokad tid för att undvika debitering.</li>
                    <li>Medlemmar har förtur vid bokning av banor.</li>
                    <li>Gäster måste alltid spela tillsammans med en medlem eller betala gästavgift.</li>
                    <li>Betalning sker via Swish, kort, Google pay, eller Presentkort</li>
                    <li>Vid frågor om bokning, kontakta oss på <a href="mailto:info@etktennis.se" className="text-blue-600 underline">info@etktennis.se</a>.</li>
                </ul>
            </div>
        </div>
    );
}