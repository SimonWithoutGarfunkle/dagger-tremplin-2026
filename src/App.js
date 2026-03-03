import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZapOff, Maximize, Minimize } from 'lucide-react';
import MatrixRain from './MatrixRain';
import slides from './slides';

// --- Rendu du texte avec **gras** ---
const BoldText = ({ line }) =>
    line.split('**').map((part, i) =>
        i % 2 === 1
            ? <span key={i} className="text-white font-bold border-b border-green-500/30">{part}</span>
            : part
    );

// --- Rendu du contenu selon le type de slide ---
const renderContent = (slide) => {
    switch (slide.type) {

        case 'home':
            return (
                <div className="flex-grow flex flex-col items-center justify-center gap-10 py-4">
                    <div className="bg-green-50/80 rounded-xl px-8 py-4">
                        <img
                            src="/logo%20dagger.avif"
                            alt="Dagger"
                            className="max-h-40 w-auto"
                        />
                    </div>
                    <p className="text-3xl text-green-300 italic tracking-wide text-center">
                        {slide.tagline}
                    </p>
                </div>
            );

        case 'image':
            return (
                <div className="flex-grow flex gap-8 py-4 items-center">
                    <div className="flex-1 space-y-5">
                        {slide.content.map((line, idx) => (
                            <div key={idx} className="flex gap-4 items-start group">
                                <span className="text-green-500 font-bold group-hover:text-green-400 transition-colors text-xl mt-1">[{idx + 1}]</span>
                                <p className="text-2xl leading-relaxed text-green-200">
                                    <BoldText line={line} />
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex-shrink-0 w-1/2">
                        <img
                            src={slide.image}
                            alt={slide.imageCaption || ''}
                            className="w-full rounded border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                            style={{ filter: 'grayscale(100%) sepia(100%) hue-rotate(90deg) brightness(0.65) saturate(3)' }}
                        />
                        {slide.imageCaption && (
                            <p className="text-center text-green-400 text-sm mt-2 tracking-wider italic">{slide.imageCaption}</p>
                        )}
                    </div>
                </div>
            );

        case 'table':
            return (
                <div className="flex-grow py-3 overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {slide.tableData.headers.map((h, i) => (
                                    <th key={i} className="border border-green-500/40 bg-green-500/15 px-4 py-3 text-left text-green-300 uppercase tracking-wider font-bold text-sm">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {slide.tableData.rows.map((row, ri) => (
                                <tr key={ri} className="hover:bg-green-500/5 transition-colors">
                                    {row.map((cell, ci) => (
                                        <td key={ci} className={`border border-green-500/20 px-4 py-3 text-lg ${ci === 0 ? 'text-green-300 font-bold' : 'text-green-200'}`}>
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case 'opinion':
            return (
                <div className="flex-grow flex flex-col gap-5 py-4">
                    <div className="flex gap-5">
                        {slide.opinions.map((group, gi) => (
                            <div key={gi} className="flex-1 border border-green-500/30 p-4 bg-green-500/5 rounded">
                                <div className="text-sm font-bold text-green-300 mb-3 pb-2 border-b border-green-500/20 uppercase tracking-wider">
                                    {group.label}
                                </div>
                                <ul className="space-y-2">
                                    {group.items.map((item, ii) => (
                                        <li key={ii} className="text-green-200 text-xl flex items-start gap-2">
                                            <span className="text-green-500 font-bold mt-1">›</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-l-4 border-green-500 pl-5 py-3 bg-green-500/5 rounded-r">
                        <p className="text-2xl text-white italic font-medium">{slide.verdict}</p>
                    </div>
                </div>
            );

        case 'question':
            return (
                <div className="flex-grow flex flex-col items-center justify-center gap-8 py-4">
                    <div className="text-center border border-green-500/30 bg-green-500/5 rounded px-12 py-6 space-y-5 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                        <p className="text-green-400 text-lg font-bold uppercase tracking-[0.4em] mb-4">{"// Support disponible"}</p>
                        <p className="text-green-300 text-xl tracking-wider">
                            Question <span className="text-white font-bold">simple</span> → demandez à <span className="text-green-400 font-bold">Maxime & Simon</span>
                        </p>
                        <p className="text-green-300 text-xl tracking-wider">
                            Question <span className="text-white font-bold">complexe</span> → demandez à <span className="text-green-400 font-bold">Claude</span>
                        </p>
                    </div>
                    <p className="text-green-500 text-sm tracking-widest uppercase">[ ← → ] naviguer · [ F ] plein écran</p>
                </div>
            );

        default: // 'default' — liste de bullet points
            return (
                <div className="flex-grow py-5 space-y-6">
                    {slide.content.map((line, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                            <span className="text-green-500 font-bold group-hover:text-green-400 transition-colors text-xl mt-1">[{idx + 1}]</span>
                            <p className="text-2xl md:text-3xl leading-relaxed text-green-200">
                                <BoldText line={line} />
                            </p>
                        </div>
                    ))}
                </div>
            );
    }
};

// Dimensions de référence de la slide (base de calcul pour le scaling)
const SLIDE_BASE_W = 1100;
const SLIDE_BASE_H = 680;

// --- Composant Principal ---
export default function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [slideScale, setSlideScale] = useState(1);
    const [animationsEnabled, setAnimationsEnabled] = useState(
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    const containerRef = useRef(null);

    // Calcule le facteur d'échelle selon la taille de la fenêtre
    const computeScale = (fullscreen) => {
        if (fullscreen) {
            return Math.min(
                (window.innerWidth  * 0.90) / SLIDE_BASE_W,
                (window.innerHeight * 0.85) / SLIDE_BASE_H
            );
        }
        return Math.min(1, (window.innerWidth - 32) / SLIDE_BASE_W);
    };

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Gestion des touches du clavier + fullscreen + resize
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight" || e.key === " ") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "f" || e.key === "F") toggleFullscreen();
        };

        const handleFullscreenChange = () => {
            const isFs = !!document.fullscreenElement;
            setIsFullscreen(isFs);
            setSlideScale(computeScale(isFs));
        };

        const handleResize = () => {
            setSlideScale(computeScale(!!document.fullscreenElement));
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            window.removeEventListener("resize", handleResize);
        };
    }, [currentSlide]); // eslint-disable-line react-hooks/exhaustive-deps

    // Effet machine à écrire pour le titre
    useEffect(() => {
        let i = 0;
        const text = slides[currentSlide].title;
        setTypedText("");
        const timer = setInterval(() => {
            setTypedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <div
            ref={containerRef}
            className={`relative min-h-screen bg-black text-green-500 font-mono overflow-hidden flex flex-col items-center justify-center p-4 selection:bg-green-500 selection:text-black${!animationsEnabled ? ' no-animations' : ''}`}
        >
            <MatrixRain enabled={animationsEnabled} />

            {/* Boutons flottants */}
            <div className="fixed top-6 right-6 z-50 flex gap-2">
                <button
                    onClick={() => setAnimationsEnabled(v => !v)}
                    className={`p-3 border rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                        animationsEnabled
                            ? 'bg-black/60 border-green-500/50 hover:bg-green-500 hover:text-black shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                            : 'bg-green-500 text-black border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]'
                    }`}
                    title={animationsEnabled ? 'Activer le mode anti-épilepsie' : 'Désactiver le mode anti-épilepsie'}
                >
                    <ZapOff size={20} />
                </button>
                <button
                    onClick={toggleFullscreen}
                    className="p-3 bg-black/60 border border-green-500/50 rounded-full hover:bg-green-500 hover:text-black transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    title="Plein écran (F)"
                >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
            </div>

            {/* Slide Container */}
            <div
                style={{
                    width: `${SLIDE_BASE_W}px`,
                    transform: `scale(${slideScale})`,
                    transformOrigin: 'center center',
                }}
                className="relative z-10 bg-black/80 border-2 border-green-500/50 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.3)] p-8 backdrop-blur-sm overflow-hidden min-h-[580px] flex flex-col justify-between transition-transform duration-300"
            >
                {/* Effet de scan */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent opacity-20 h-2 w-full animate-scan" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 border-b border-green-500/30 pb-4">
                    <div className="bg-green-500/10 p-3 rounded border border-green-500/50">
                        {slides[currentSlide].icon}
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-1 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                            {typedText}<span className="animate-pulse">_</span>
                        </h1>
                        {slides[currentSlide].subtitle && (
                            <p className="text-green-400/80 text-lg md:text-xl italic">
                                {slides[currentSlide].subtitle}
                            </p>
                        )}
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                        <div className="text-xs text-green-500 font-bold uppercase tracking-widest">Access Node: 0.19</div>
                        <div className="text-xl font-bold bg-green-500 text-black px-2 rounded">
                            {slides[currentSlide].id}
                        </div>
                    </div>
                </div>

                {/* Content — rendu dynamique selon le type de slide */}
                {renderContent(slides[currentSlide])}

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-green-500/30 flex justify-between items-center text-sm md:text-base uppercase tracking-widest text-green-500">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {slides[currentSlide].footer}
                    </span>
                    <div className="flex gap-3">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded border border-green-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black ${currentSlide === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]'}`}
                        >
                            <ChevronLeft size={20} /> PREV
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded border border-green-500/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-1 focus-visible:ring-offset-black ${currentSlide === slides.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]'}`}
                        >
                            NEXT <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Decorative Matrix Code Elements */}
            <div className="absolute top-4 left-4 text-[10px] text-green-800 opacity-40 hidden lg:block leading-tight">
                LOG_LEVEL: VERBOSE<br />
                ENCRYPTION: AES-256-GCM<br />
                BYPASS_FIREWALL: TRUE<br />
                USER: [REDACTED]
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] text-green-800 opacity-40 hidden lg:block leading-tight">
                KEYBOARD_SHORTCUTS:<br />
                [F] FULLSCREEN<br />
                [ARROWS] NAVIGATE<br />
                [SPACE] NEXT
            </div>

            <style>{`
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(600%); }
                }
                .animate-scan {
                    animation: scan 6s linear infinite;
                }
                .no-animations .animate-scan,
                .no-animations .animate-pulse { animation: none; }
                @media (prefers-reduced-motion: reduce) {
                    .animate-scan, .animate-pulse { animation: none; }
                }
            `}</style>
        </div>
    );
}
