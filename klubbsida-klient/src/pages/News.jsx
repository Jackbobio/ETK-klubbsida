export default function News() {
    return (
        <div className="news" class="font-bodoni">
            <div class="flex flex-row items-center justify-center gap-10 pt-5 max-w-6xl">
            <div>
                <img src="/images/closeup-tennisball-gravel.webp" alt="" />
                <p class="p-2">2025-05-01</p>
                <h2 class="text-3xl pl-4">Grusbanorna har öppnat!</h2>
                <p class="p-2 hover:underline"><a href="">Läs mer</a></p>
            </div>
            <div>
                <img src="/images/far-young-tennisplayer.webp" alt="" />
                <p class="p-2">2025-04-13</p>
                <h2 class="text-3xl pl-4">Nya Juniortränare</h2>
                <p class="p-2 hover:underline"><a href="">Läs mer</a></p>
            </div>
            <div>
            <img src="/images/closeup-tennisballs.webp" alt="" />
                <p class="p-2">2025-03-25</p>
                <h2 class="text-3xl pl-4">Nyinköpta bollar</h2>
                <p class="p-2 hover:underline"><a href="">Läs mer</a></p>
            </div>
        </div>
        </div>
    )
}