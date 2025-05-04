import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-7 font-bodoni ">
            <div className="flex flex-row justify-between">
                <div className="">
                    <h2 className="text-3xl pb-3">Ellagårds Tennisklubb</h2>
                    <p className="pl-3 pb-1">Adress: Skiftesvägen 83</p>
                    <p className="pl-3 pb-1">Telefon: 070-529 08 00</p>
                    <p className="pl-3 pb-1">Email: info@etktennis.se</p>
                </div>
                
                <div className="flex flex-col ">
                    <h3 className="text-xl pb-3">Följ oss på sociala medier:</h3>
                    <a href="#" className="text-white hover:text-gray-400 pl-2 pb-1">Facebook</a>
                    <a href="#" className="text-white hover:text-gray-400 pl-2 pb-1">Twitter</a>
                    <a href="#" className="text-white hover:text-gray-400 pl-2 pb-1">Instagram</a>
                </div>
            </div>
        </footer>
    )
}