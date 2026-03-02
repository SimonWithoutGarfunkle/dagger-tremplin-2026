import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Terminal, Box, Zap, Globe, Cpu, Maximize, Minimize } from 'lucide-react';

// --- Composant de Pluie Matrix (Canvas) ---
const MatrixRain = () => {
    const canvasRef = useRef(null);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (prefersReduced) return;
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
                if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
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

    if (prefersReduced) return null;
    return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40" />;
};

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
                    {/* Logo Dagger — remplacer par <img src="/dagger-logo.png" /> si disponible */}
                    <div className="border-2 border-green-500/60 bg-green-500/5 px-14 py-7 text-center rounded shadow-[0_0_50px_rgba(34,197,94,0.25)]">
                        <div className="text-7xl font-bold tracking-[0.3em] text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.9)] font-mono">
                            ◈ DAGGER ◈
                        </div>
                        <div className="text-green-500 text-sm tracking-[0.5em] mt-3 uppercase">// CI/CD Engine</div>
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
                    <div className="text-center border border-green-500/30 bg-green-500/5 rounded px-12 py-6 space-y-3 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                        <p className="text-green-400 text-lg font-bold uppercase tracking-[0.4em] mb-4">// Ressources</p>
                        <p className="text-green-300 text-xl tracking-wider">github.com/dagger/dagger</p>
                        <p className="text-green-300 text-xl tracking-wider">docs.dagger.io</p>
                        <p className="text-green-300 text-xl tracking-wider">daggerverse.dev</p>
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

// --- Contenu des Slides ---
const slides = [
    // 1 — Home
    {
        id: 1,
        type: 'home',
        title: "DAGGER",
        subtitle: "Entrez dans la Matrice",
        tagline: "Le coup de couteau dans le YAML",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        footer: "CI/CD Programmable & Local-First"
    },

    // 2 — C'est quoi ?
    {
        id: 2,
        type: 'default',
        title: "C'est quoi ?",
        subtitle: "Un runtime universel pour vos pipelines",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "Ta pipeline tourne **pareil** sur Mac, Windows, Linux, serveur ou cloud",
            "Ce que **Docker** est à ton app, **Dagger** l'est à ta pipeline",
            "Un seul code de pipeline — zéro réécriture entre environnements"
        ],
        footer: "Build once, run anywhere."
    },

    // 3 — C'est qui ?
    {
        id: 3,
        type: 'image',
        title: "C'est qui ?",
        subtitle: "Le créateur de Docker récidive",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "**Solomon Hykes** : co-fondateur de Docker",
            "Même philosophie : **isolation + portabilité**",
            "Pas une coïncidence — c'est une vision"
        ],
        image: "/solomon hykes.jpg",
        imageCaption: "Solomon Hykes · Dagger CEO",
        footer: "L'ADN Docker, appliqué au CI/CD."
    },

    // 4 — Pourquoi Dagger ?
    {
        id: 4,
        type: 'default',
        title: "Pourquoi Dagger ?",
        subtitle: "Ce que le YAML ne peut pas faire",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        content: [
            "**Push & Pray** : on pousse et on espère que ça passe en CI",
            "**Debug impossible** : 2h de file d'attente pour voir un log d'erreur",
            "**Duplication massive** : des milliers de lignes YAML illisibles",
            "**Zéro portabilité** : chaque CI a ses propres règles propriétaires"
        ],
        footer: "Il existe une sortie de la Matrice YAML."
    },

    // 5 — Pourquoi Accenture ?
    {
        id: 5,
        type: 'default',
        title: "Pourquoi Accenture ?",
        subtitle: "Un contexte qui pousse à innover",
        icon: <Globe className="w-12 h-12 text-green-500" />,
        content: [
            "**Batect** : notre CI portable historique, non maintenu depuis 2022",
            "**Suite WFM complexe** : mon app ne démarre pas sans 3 autres applis minimum",
            "**Runners saturés** : 2h de file d'attente pour débugger une pipeline",
            "**Run local** : vraie plus-value quand les runners sont rares et les devs nombreux"
        ],
        footer: "Le bon outil, au bon moment."
    },

    // 6 — Niveau 1 : CLI
    {
        id: 6,
        type: 'default',
        title: "Niveau 1 : CLI",
        subtitle: "Zéro friction pour commencer",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        content: [
            "**dagger call** : appeler une fonction de pipeline directement depuis le terminal",
            "**Sans configuration** : utilisable immédiatement sur n'importe quel projet",
            "**Feedback local** : tester et débugger sans attendre un runner distant",
            "**Compatible tous CI** : un seul entrypoint pour GitHub Actions, GitLab, Jenkins..."
        ],
        footer: "Votre terminal est votre nouveau CI runner."
    },

    // 7 — Niveau 2 : SDK Java
    {
        id: 7,
        type: 'default',
        title: "Niveau 2 : SDK Java",
        subtitle: "Les superpouvoirs de notre écosystème",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        content: [
            "**Typage fort** : chaque objet Dagger est typé, fini les surprises à l'exécution",
            "**Erreurs à la compilation** : l'IDE vous prévient avant même de lancer",
            "**Autocompletion** : explorez l'API Dagger comme n'importe quelle lib Java",
            "Tous les avantages de votre environnement de développement habituel"
        ],
        footer: "Vos pipelines, comme des apps Java."
    },

    // 8 — Mise en oeuvre : Avant
    {
        id: 8,
        type: 'default',
        title: "Mise en oeuvre",
        subtitle: "Avant Dagger — l'ancien monde",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "**Scripts shell** : 400 lignes de bash non testables, non typées",
            "**YAML dupliqué** : un fichier par environnement, une incohérence par semaine",
            "**Debug** : git push → 20 min d'attente → lire les logs → recommencer",
            "**Onboarding** : 2 jours pour qu'un nouveau dev lance sa première pipeline"
        ],
        footer: "L'ancien monde."
    },

    // 9 — Avant / Après (tableau)
    {
        id: 9,
        type: 'table',
        title: "Avant / Après",
        subtitle: "Ce que Dagger change concrètement",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        tableData: {
            headers: ["Critère", "Avant Dagger", "Avec Dagger"],
            rows: [
                ["Lancement local",  "❌ Impossible",              "✅ dagger call en 30s"],
                ["Debug pipeline",   "⏳ 2h de file runner",       "✅ Immédiat en local"],
                ["Réutilisation",    "📋 Copy-paste YAML",         "✅ Fonctions typées & testables"],
                ["Onboarding",       "📅 ~2 jours",                "✅ ~2 heures"],
                ["Maintenance",      "⚠️ Fragile & implicite",     "✅ Compilé & versionné"],
            ]
        },
        footer: "Les chiffres parlent d'eux-mêmes."
    },

    // 10 — Limites
    {
        id: 10,
        type: 'default',
        title: "Les Limites",
        subtitle: "Ce qu'il faut savoir avant de se lancer",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "**V1 pas encore sortie** : stable mais des breaking changes entre versions (renommages d'API)",
            "**LLMs à cadrer** : Claude mélange les versions — efficace quand on le recadre sur les docs",
            "**Peu de ressources Java** : la communauté est surtout sur Go, les exemples Java sont rares",
            "**Relativement récent** : peu de retours d'expérience en production à grande échelle"
        ],
        footer: "Adopter en connaissance de cause."
    },

    // 11 — Avis de Maxime
    {
        id: 11,
        type: 'opinion',
        title: "Avis de Maxime",
        subtitle: "Promesse tenue ?",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        opinions: [
            {
                label: "✅ Ce qui m'a convaincu",
                items: [
                    "Le run local est un vrai game changer",
                    "Le SDK Java rend les pipelines maintenables",
                    "L'intégration dans la stack existante s'est bien passée"
                ]
            },
            {
                label: "⚠️ Points d'attention",
                items: [
                    "Mise à jour = risque de casse sur les APIs",
                    "SDK Java moins documenté que Go",
                    "Courbe d'apprentissage au démarrage"
                ]
            }
        ],
        verdict: "Promesse tenue — à condition de figer sa version et de bien documenter.",
        footer: "Verdict de Maxime."
    },

    // 12 — Avis de Simon
    {
        id: 12,
        type: 'opinion',
        title: "Avis de Simon",
        subtitle: "Promesse tenue ?",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        opinions: [
            {
                label: "✅ Ce qui m'a convaincu",
                items: [
                    "Fin du Push & Pray, enfin !",
                    "Le typage Java réduit les bugs de pipeline",
                    "Vision produit solide, équipe core très active"
                ]
            },
            {
                label: "⚠️ Points d'attention",
                items: [
                    "Trouver de la doc Java demande du creusage",
                    "V0 encore jeune — prévoir du budget pour les mises à jour"
                ]
            }
        ],
        verdict: "Oui — à adopter dès maintenant, les yeux ouverts sur la version.",
        footer: "Verdict de Simon."
    },

    // 13 — Questions
    {
        id: 13,
        type: 'question',
        title: "Des questions ?",
        subtitle: "Dagger · Java SDK · CI/CD Local",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        footer: "Merci pour votre attention."
    }
];

// Dimensions de référence de la slide (base de calcul pour le scaling)
const SLIDE_BASE_W = 1100;
const SLIDE_BASE_H = 680;

// --- Composant Principal ---
export default function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [slideScale, setSlideScale] = useState(1);
    const containerRef = useRef(null);

    // Calcule le facteur d'échelle selon la taille de la fenêtre
    const computeScale = (fullscreen) => {
        if (fullscreen) {
            return Math.min(
                (window.innerWidth  * 0.90) / SLIDE_BASE_W,
                (window.innerHeight * 0.85) / SLIDE_BASE_H
            );
        }
        // En mode normal : scale down uniquement si l'écran est plus petit que la slide
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

    // Gestion des touches du clavier
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
            className="relative min-h-screen bg-black text-green-500 font-mono overflow-hidden flex flex-col items-center justify-center p-4 selection:bg-green-500 selection:text-black"
        >
            <MatrixRain />

            {/* Bouton Plein Écran flottant */}
            <button
                onClick={toggleFullscreen}
                className="fixed top-6 right-6 z-50 p-3 bg-black/60 border border-green-500/50 rounded-full hover:bg-green-500 hover:text-black transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                title="Plein écran (F)"
            >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>

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
                @media (prefers-reduced-motion: reduce) {
                    .animate-scan  { animation: none; }
                    .animate-pulse { animation: none; }
                }
            `}</style>
        </div>
    );
}
