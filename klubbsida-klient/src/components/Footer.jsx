import React from 'react';
import AnimatedLink from './ui/AnimatedLink';

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
                    <AnimatedLink to="https://www.instagram.com/ellagardstk/" color="white" target="_blank" className="text-sm md:text-base pb-1">Instagram
                    </AnimatedLink>
                </div>
            </div>
        </footer>
    )
}