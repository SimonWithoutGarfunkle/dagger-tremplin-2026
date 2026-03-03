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
            "**Dagger** est à ta pipeline, ce que **Docker** est à ton app !",
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
            "Même philosophie : **isolation + portabilité**",
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
        subtitle: "Cinq problèmes, une réponse",
        icon: <Zap className="w-12 h-12 text-green-500" />,
        content: [
            "**CI en local** : fini la divergence entre ton poste et le serveur — tu exécutes la même pipeline partout",
            "**Faible couplage** : la plateforme CI (GitHub, GitLab…) devient un simple déclencheur, pas un fournisseur propriétaire",
            "**Du code, pas du YAML** : des pipelines maintenables, testables et versionnées comme du vrai code",
            "**Containers partout** : chaque étape tourne dans un environnement isolé et identique — local ou CI"
        ],
        footer: "Il existe une sortie de la Matrice YAML."
    },

    // 6 — Comment ça marche ?
    {
        id: 6,
        type: 'default',
        title: "Comment ?",
        subtitle: "Les rouages sous le capot",
        icon: <Cpu className="w-12 h-12 text-green-500" />,
        content: [
            "**Dagger Engine** : un daemon local (lui-même containerisé) qui orchestre et exécute les étapes",
            "**Chaque étape = un container** : isolation garantie, comportement identique local ou CI",
            "**Cache automatique** : si les inputs n'ont pas changé, l'étape est réutilisée — zéro travail inutile"
        ],
        footer: "Docker comme runtime, ton langage comme syntaxe."
    },

    // 7 — Pourquoi Accenture ?
    {
        id: 7,
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

    // 8 — Niveau 1 : CLI
    {
        id: 8,
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

    // 9 — Niveau 2 : SDK Java
    {
        id: 9,
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

    // 10 — Mise en oeuvre : Avant
    {
        id: 10,
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

    // 11 — Avant / Après (tableau)
    {
        id: 11,
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

    // 12 — Pas mal non ?
    {
        id: 12,
        type: 'fullimage',
        title: "Pas mal non ?",
        subtitle: "C'est presque français",
        icon: <Box className="w-12 h-12 text-green-500" />,
        image: "/orson-welles-welles.gif",
        imageCaption: "Une entreprise américaine et un papa français",
        footer: "... non. Pas celui-là."
    },

    // 13 — Limites
    {
        id: 13,
        type: 'default',
        title: "Les Limites",
        subtitle: "Ce qu'il faut savoir avant de se lancer",
        icon: <Box className="w-12 h-12 text-green-500" />,
        content: [
            "**V1 pas encore sortie** : stable mais des breaking changes entre versions (renommages d'API)",
            "**LLMs à cadrer** : Claude mélange les versions — efficace quand on le recadre sur les docs",
            "**Peu de ressources Java** : la communauté est surtout sur Go, les exemples Java sont rares",
            "**Relativement récent** : peu de retours d'expérience en production à grande échelle",
            "**Business model non définitif** : actuellement gratuit, mais ça peut changer — le même fondateur l'a déjà fait"
        ],
        footer: "Adopter en connaissance de cause."
    },

    // 14 — Avis de Maxime
    {
        id: 14,
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

    // 15 — Avis de Simon
    {
        id: 15,
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

    // 16 — Pour aller + loin
    {
        id: 16,
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

    // 17 — Questions
    {
        id: 17,
        type: 'question',
        title: "Des questions ?",
        subtitle: "Dagger · Java SDK · CI/CD Local",
        icon: <Terminal className="w-12 h-12 text-green-500" />,
        footer: "Merci pour votre attention."
    }
];

export default slides;
