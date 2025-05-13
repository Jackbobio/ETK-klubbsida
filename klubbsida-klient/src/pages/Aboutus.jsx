import React from 'react';

export default function About() {
    return (
        <div className="font-bodoni flex flex-col items-center">
            <h1 className="text-6xl font-medium p-4">Om Ellagårds tennisklubb</h1>
            <p className="max-w-5xl p-4 text-center">
                Ellagårds tennisklubb är en ideell förening som samlar tennisentusiaster i alla åldrar och på alla nivåer. Klubben har varit en naturlig mötesplats för sport, gemenskap och utveckling sedan starten.
            </p>
            <section className="max-w-4xl p-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">Vår historia</h2>
                <p>
                    Klubben grundades 1985 och har sedan dess vuxit till att bli en av de mest uppskattade tennisklubbarna i regionen. Med både inomhus- och utomhusbanor erbjuder vi spelmöjligheter året runt.
                </p>
            </section>
            <section className="max-w-4xl p-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">Våra värderingar</h2>
                <p>
                    Vi värnar om gemenskap, glädje och utveckling. Hos oss är alla välkomna, oavsett om du är nybörjare eller erfaren spelare. Vi arrangerar träningar, tävlingar och sociala aktiviteter för både barn och vuxna.
                </p>
            </section>
        </div>
    )
}