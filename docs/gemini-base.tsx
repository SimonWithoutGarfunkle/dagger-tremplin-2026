import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Terminal, Box, Zap, Globe, Cpu, Maximize, Minimize } from 'lucide-react';

// --- Composant de Pluie Matrix (Canvas) ---
const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]";
        const fontSize = 16;
        const columns = Math.floor(width / fontSize);
        const drops = new Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40" />;
};

// --- Contenu des Slides ---
const slides = [
    {
        id: 1,
        title: "Dagger : Entrez dans la Matrice",
        subtitle: "Le CI/CD Programmable & Local-First",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        content: [
            "Le CI/CD traditionnel est une prison de YAML.",
            "Dagger brise les chaînes en transformant vos pipelines en code réel.",
            "Bienvenue dans l'ère de l'automatisation intelligente."
        ],
        footer: "Architecture Zenith : Le moteur universel."
    },
    {
        id: 2,
        title: "L'Enfer du YAML (The Matrix)",
        subtitle: "Pourquoi le CI/CD actuel est cassé ?",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "**L'Effet Boîte Noire** : On 'pousse et on prie' (Push and Pray).",
            "**Duplication massive** : Des milliers de lignes YAML illisibles.",
            "**Isolation** : Impossible de tester ses pipelines sur son propre laptop.",
            "**Lenteur** : Pas de gestion de cache intelligente entre le local et le cloud."
        ],
        footer: "Libérez votre esprit du YAML propriétaire."
    },
    {
        id: 3,
        title: "Dagger Engine & Programmabilité",
        subtitle: "Utilisez vos langages, pas des scripts",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        content: [
            "**Moteur Multi-Langages** : Go, Python, TypeScript, Java.",
            "**GraphQL sous le capot** : Chaque action est une requête vers une API unifiée.",
            "**Buildkit Optimized** : Dagger utilise la puissance de Docker/Buildkit pour paralléliser l'exécution.",
            "**Type-Safe** : Votre pipeline est vérifié à la compilation, pas au runtime."
        ],
        footer: "Vos pipelines sont des applications comme les autres."
    },
    {
        id: 4,
        title: "Dagger Modules (Zenith)",
        subtitle: "Le Daggerverse : Réutilisabilité Totale",
        icon: <Globe className="w-12 h-12 text-green-500" />,
        content: [
            "**Modularité** : Encapsulez des outils complexes (AWS, Terraform, K8s) en fonctions.",
            "**Interface Unifiée** : Appelez un module Go depuis un projet Python sans friction.",
            "**Zenith** : La nouvelle architecture qui expose vos fonctions CLI comme une API.",
            "**Partage** : Importez des modules directement depuis GitHub."
        ],
        footer: "Un écosystème global de blocs de construction CI/CD."
    },
    {
        id: 5,
        title: "Local-First : La Réalité Déchirée",
        subtitle: "Le même pipeline, partout, tout le temps",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        content: [
            "**Zéro Dérive** : Ce qui tourne sur votre machine tournera sur GitHub Actions/GitLab.",
            "**Debug Interactif** : Ouvrez un shell instantanément dans un pipeline qui échoue.",
            "**Cache Distribué** : Partagez les couches de build entre tous les développeurs via Dagger Cloud.",
            "**Portabilité** : Changez de provider de CI en 5 minutes sans réécrire une ligne."
        ],
        footer: "Dagger : La pièce manquante du DevOps moderne."
    }
];

// --- Composant Principal ---
export default function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

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

    // Gestion des touches du clavier
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight" || e.key === " ") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "f" || e.key === "F") toggleFullscreen();
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [currentSlide]);

    // Effet machine à écrire pour le titre
    useEffect(() => {
        let i = 0;
        const text = slides[currentSlide].title;
        setTypedText("");
        const timer = setInterval(() => {
            setTypedText((prev) => text.substring(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen bg-black text-green-500 font-mono overflow-hidden flex flex-col items-center justify-center p-4 selection:bg-green-500 selection:text-black"
        >
            <MatrixRain />

            {/* Bouton Plein Écran flottant */}
            <button
                onClick={toggleFullscreen}
                className="fixed top-6 right-6 z-50 p-3 bg-black/60 border border-green-500/50 rounded-full hover:bg-green-500 hover:text-black transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                title="Plein écran (F)"
            >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>

            {/* Slide Container */}
            <div className={`relative z-10 w-full max-w-5xl bg-black/80 border-2 border-green-500/50 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.3)] p-8 backdrop-blur-sm overflow-hidden min-h-[550px] flex flex-col justify-between transition-all duration-500 ${isFullscreen ? 'scale-110' : ''}`}>

                {/* Effet de scan */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent opacity-20 h-2 w-full animate-scan" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-green-500/30 pb-4">
                    <div className="bg-green-500/10 p-3 rounded border border-green-500/50">
                        {slides[currentSlide].icon}
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-1 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                            {typedText}<span className="animate-pulse">_</span>
                        </h1>
                        <p className="text-green-400/80 text-lg md:text-xl italic">
                            {slides[currentSlide].subtitle}
                        </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                        <div className="text-xs text-green-700 font-bold uppercase tracking-widest">Access Node: 0.19</div>
                        <div className="text-xl font-bold bg-green-500 text-black px-2 rounded">
                            {slides[currentSlide].id}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow py-6 space-y-8">
                    {slides[currentSlide].content.map((line, idx) => (
                        <div key={idx} className="flex gap-6 items-start group">
                            <span className="text-green-700 font-bold group-hover:text-green-400 transition-colors text-xl mt-1">[{idx + 1}]</span>
                            <p className="text-2xl md:text-3xl leading-relaxed text-green-200">
                                {line.split('**').map((part, i) =>
                                    i % 2 === 1 ? <span key={i} className="text-white font-bold border-b border-green-500/30">{part}</span> : part
                                )}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-green-500/30 flex justify-between items-center text-sm md:text-base uppercase tracking-widest text-green-700">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {slides[currentSlide].footer}
          </span>
                    <div className="flex gap-3">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded border border-green-500/50 transition-all ${currentSlide === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]'}`}
                        >
                            <ChevronLeft size={20} /> PREV
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className={`flex items-center gap-2 px-4 py-2 rounded border border-green-500/50 transition-all ${currentSlide === slides.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]'}`}
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
        :fullscreen .max-w-5xl {
          max-width: 90vw;
          min-height: 85vh;
        }
      `}</style>
        </div>
    );
}