export default function AppLogo() {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 bg-gray-50/80 px-2.5 py-1 rounded-xl border border-gray-200/60 shadow-2xs">
                <img
                    src="/images/Logo Pemkot.png"
                    alt="Logo Pemkot Bandung"
                    className="h-7 w-auto object-contain transition-transform hover:scale-105"
                />
                <img
                    src="/images/Logo Disbudpar.png"
                    alt="Logo Disbudpar"
                    className="h-7 w-auto object-contain transition-transform hover:scale-105"
                />
                <img
                    src="/images/Logo BCH.png"
                    alt="Logo BCH"
                    className="h-7 w-auto object-contain transition-transform hover:scale-105 hidden sm:block"
                />
                <img
                    src="/images/Logo TCS.png"
                    alt="Logo TCS"
                    className="h-7 w-auto object-contain transition-transform hover:scale-105 hidden md:block"
                />
                <img
                    src="/images/Logo Pasir Kunci.png"
                    alt="Logo Pasir Kunci"
                    className="h-7 w-auto object-contain transition-transform hover:scale-105 hidden lg:block"
                />
            </div>
        </div>
    );
}
