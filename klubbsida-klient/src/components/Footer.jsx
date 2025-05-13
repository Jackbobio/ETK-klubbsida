import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-7 font-bodoni ">
            <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6 md:gap-0">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl pb-2 md:pb-3">Ellagårds Tennisklubb</h2>
                    <p className="pl-0 md:pl-3 pb-1">Adress: Skiftesvägen 83</p>
                    <p className="pl-0 md:pl-3 pb-1">Telefon: 070-529 08 00</p>
                    <p className="pl-0 md:pl-3 pb-1">Email: info@etktennis.se</p>
                </div>
                
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg md:text-xl pb-2 md:pb-3">Följ oss på sociala medier:</h3>
                    <a href="#" className="text-white hover:text-gray-400 pl-0 md:pl-2 pb-1">Facebook</a>
                    <a href="#" className="text-white hover:text-gray-400 pl-0 md:pl-2 pb-1">Twitter</a>
                    <a href="#" className="text-white hover:text-gray-400 pl-0 md:pl-2 pb-1">Instagram</a>
                </div>
            </div>
        </footer>
    )
}