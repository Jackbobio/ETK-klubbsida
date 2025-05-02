export default function Footer() {
    return (
        <footer class="bg-gray-800 text-white p-7 font-bodoni ">
            <div class="flex flex-row justify-between">
                <div class="">
                    <h2 class="text-3xl pb-3">Ellagårds Tennisklubb</h2>
                    <p class="pl-3 pb-1">Adress: Skiftesvägen 83</p>
                    <p class="pl-3 pb-1">Telefon: 070-529 08 00</p>
                    <p class="pl-3 pb-1">Email: info@etktennis.se</p>
                </div>
                
                <div class="flex flex-col ">
                    <h3 class="text-xl pb-3">Följ oss på sociala medier:</h3>
                    <a href="#" class="text-white hover:text-gray-400 pl-2 pb-1">Facebook</a>
                    <a href="#" class="text-white hover:text-gray-400 pl-2 pb-1">Twitter</a>
                    <a href="#" class="text-white hover:text-gray-400 pl-2 pb-1">Instagram</a>
                </div>
            </div>
        </footer>
    )
}