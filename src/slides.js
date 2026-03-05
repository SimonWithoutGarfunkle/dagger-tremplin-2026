import React from 'react';
import { Terminal, Box, Zap, Globe, Cpu } from 'lucide-react';

const slides = [
    // 1 — Home
    {
        id: 1,
        type: 'home',
        title: "DAGGER",
        subtitle: "Entrez dans la Matrice",
        tagline: "Le coup de couteau dans YAML",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        footer: "CI/CD Programmable & Local-First"
    },

    // 2 — Blague : le mauvais Dagger
    {
        id: 2,
        type: 'fullimage',
        title: "C'est quoi ?",
        subtitle: "Ah… ce Dagger-là ?",
        icon: <Box className="w-12 h-12 text-green-500" />,
        image: "/dagger google.png",
        imageCaption: "Dagger — framework d'injection de dépendances Google/Square pour Android/Java",
        footer: "... non. Pas celui-là."
    },

    // 3 — C'est quoi ?
    {
        id: 3,
        type: 'default',
        title: "C'est quoi ?",
        subtitle: "Un runtime universel pour vos pipelines",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "Mars 2022",
            "Outil CICD Open Source",
            "Remplace un YAML static et linéaire par un orchestrateur intelligent",
            "**Dagger** est à la pipeline, ce que **Docker** est à l'app !",
            "Coïncidence ? ..."
        ],
        footer: "Build once, run anywhere."
    },

    // 4 — C'est qui ?
    {
        id: 4,
        type: 'image',
        title: "C'est qui ?",
        subtitle: "Le créateur de Docker récidive",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "**Solomon Hykes** : co-fondateur de Docker",
            "Pas une coïncidence — c'est une vision"
        ],
        image: "/solomon hykes.jpg",
        imageCaption: "Solomon Hykes · Dagger CEO",
        footer: "L'ADN Docker, appliqué au CI/CD."
    },

    // 5 — Pourquoi Dagger ?
    {
        id: 5,
        type: 'default',
        title: "Pourquoi Dagger ?",
        subtitle: "Trois problèmes, une réponse",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        content: [
            "**CI en local** : fini la divergence entre le poste de dev et le serveur — la même pipeline partout",
            "**Faible couplage** : la plateforme CI (GitHub, GitLab…) devient un simple déclencheur, pas un fournisseur propriétaire",
            "**Du code, pas du YAML** : des pipelines maintenables comme du vrai code"
        ],
        footer: "Il existe une sortie de la Matrice YAML."
    },

    // 6 — Comment ça marche : SDK et CLI
    {
        id: 6,
        type: 'default',
        title: "Comment ?",
        subtitle: "Les SDK et la CLI",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        content: [
            "**SDK disponibles** : Go, Python, TypeScript, PHP, Java — la pipeline dans le langage de son choix",
            "**Le SDK compile vers GraphQL** : le code devient des requêtes que le moteur comprend",
            "**La CLI est le proxy** : elle reçoit les requêtes GraphQL et les transmet au Dagger Engine"
        ],
        footer: "Le langage de son choix, le moteur Dagger."
    },

    // 7 — Comment ça marche : Le DAG
    {
        id: 7,
        type: 'default',
        title: "Comment ?",
        subtitle: "Le DAG — Directed Acyclic Graph",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        content: [
            "**Graphe de dépendances** : Dagger analyse le code et construit automatiquement le graphe",
            "**Parallélisme automatique** : deux nœuds sans liaison entre eux s'exécutent en parallèle",
            "**Cache intelligent** : un nœud inchangé n'est pas ré-exécuté — zéro travail inutile"
        ],
        footer: "Plus de séquençage manuel — le graphe s'en charge."
    },

    // 8 — Comment ça marche : BuildKit
    {
        id: 8,
        type: 'default',
        title: "Comment ?",
        subtitle: "BuildKit — le moteur sous le capot",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        content: [
            "**Transforme des définitions de build en artefacts** : images, binaires, fichiers…",
            "**LLB** : format de graphe intermédiaire décrivant les opérations sur les systèmes de fichiers"
        ],
        footer: "BuildKit : la même technologie que derrière Docker."
    },

    // 9 — BuildKit DAG image
    {
        id: 9,
        type: 'fullimage',
        title: "Comment ?",
        subtitle: "Le graphe BuildKit en action",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        image: "/buildkit-dag.svg",
        imageWhiteBg: true,
        imageCaption: "Graphe LLB généré pour BuildKit — parallélisme et cache au niveau des nœuds",
        footer: "Chaque nœud = une opération cachable et parallélisable."
    },

    // 10 — Pourquoi Accenture ?
    {
        id: 10,
        type: 'default',
        title: "Pourquoi chez Accenture ?",
        subtitle: "Un contexte qui pousse à innover",
        icon: <Globe className="w-12 h-12 text-green-500" />,
        content: [
            "**Batect** : notre CI portable historique, non maintenu depuis 2022",
            "**Suite WFM complexe** : mon app ne démarre pas sans 4 autres applis minimum",
            "**Runners saturés** : 2h de file d'attente pour débugger une pipeline",
            "**Run local** : vraie plus-value quand les runners sont rares et les devs nombreux"
        ],
        footer: "Le bon outil, au bon moment."
    },

    // 11 — ATR waiting
    {
        id: 11,
        type: 'fullimage',
        title: "Le contexte",
        subtitle: "La réalité du terrain",
        icon: <Globe className="w-12 h-12 text-green-500" />,
        image: "/screenshots/atr waiting.png",
        imageCaption: "File d'attente ATR — 2h pour débugger une pipeline",
        footer: "2h de file d'attente pour une correction d'une ligne."
    },

    // 12 — Niveau 1 : CLI
    {
        id: 12,
        type: 'fullimage',
        title: "Niveau 1 : CLI",
        subtitle: "Zéro friction pour commencer",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        image: "/screenshots/cli command.png",
        imageCaption: "dagger call — lancer une fonction de pipeline depuis le terminal",
        footer: "Votre terminal est votre nouveau CI runner."
    },

    // 13 — Niveau 2 : SDK Java
    {
        id: 13,
        type: 'default',
        title: "Niveau 2 : SDK Java",
        subtitle: "Les superpouvoirs de notre écosystème",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        content: [
            "**Typage fort**, **Erreurs à la compilation**, **Autocompletion**",
            "Tous les avantages de votre environnement de développement habituel",
            "Aucun lien avec le langage de votre projet"
        ],
        footer: "Vos pipelines, comme des apps Java."
    },

    // 14 — Unit tests Java
    {
        id: 14,
        type: 'fullimage',
        title: "En pratique",
        subtitle: "Tests unitaires de pipeline",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        image: "/screenshots/unit tests java.png",
        imageCaption: "Tests unitaires d'une pipeline Dagger en Java",
        footer: "Des pipelines testables comme du vrai code."
    },

    // 15 — Run Java
    {
        id: 15,
        type: 'fullimage',
        title: "En pratique",
        subtitle: "Exécution locale",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        image: "/screenshots/run java.png",
        imageCaption: "Exécution d'une pipeline Java en local avec Dagger",
        footer: "Local, rapide, reproductible."
    },

    // 16 — Pas mal non ?
    {
        id: 16,
        type: 'fullimage',
        title: "Pas mal non ?",
        subtitle: "C'est presque français",
        icon: <Box className="w-12 h-12 text-green-500" />,
        image: "/orson-welles-welles.gif",
        imageCaption: "Une entreprise américaine et un papa français",
        footer: "... non. Pas celui-là."
    },

    // 17 — Limites
    {
        id: 17,
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

    // 18 — Avis de Maxime
    {
        id: 18,
        type: 'opinion',
        title: "Avis de Maxime",
        subtitle: "Promesse tenue ?",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        opinions: [
            {
                label: "✅ Ce qui m'a convaincu",
                items: [
                    "Plus de YAML",
                    "Cache automatique"
                ]
            },
            {
                label: "⚠️ Points d'attention",
                items: [
                    "Lisibilité sur la Pipeline"
                ]
            }
        ],
        verdict: "",
        footer: "Verdict de Maxime."
    },

    // 19 — Avis de Simon
    {
        id: 19,
        type: 'opinion',
        title: "Avis de Simon",
        subtitle: "Promesse tenue ?",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        opinions: [
            {
                label: "✅ Ce qui m'a convaincu",
                items: [
                    "Vraie pipeline en Java",
                    "Cache automatique"
                ]
            },
            {
                label: "⚠️ Points d'attention",
                items: [
                    "Maturité : breaking changes et manque de ressources",
                    "Mes TI tournent pas sur MacOS"
                ]
            }
        ],
        verdict: "A adopter : lisible, pas tant d'effort que ca - Si vous avez déja dit 'ca passe en local mais pas sur la pipeline' go !",
        footer: "Verdict de Simon."
    },

    // 20 — Pour aller + loin
    {
        id: 20,
        type: 'default',
        title: "Pour aller + loin",
        subtitle: "Ressources & communauté",
        icon: <Globe className="w-12 h-12 text-green-500" />,
        content: [
            "**github.com/dagger/dagger** — Le repo officiel, issues, roadmap",
            "**docs.dagger.io** — Documentation complète et références SDK",
            "**daggerverse.dev** — Explorer et partager des modules communautaires",
        ],
        footer: "La Matrice n'a plus de secrets pour vous."
    },

    // 21 — Questions
    {
        id: 21,
        type: 'question',
        title: "Des questions ?",
        subtitle: "Dagger · Java SDK · CI/CD Local",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        footer: "Merci pour votre attention."
    }
];

export default slides;
