# Olivare Parfums

Une boutique e-commerce premium de dupes de parfums de luxe, construite avec Next.js 14, TypeScript, Supabase, Tailwind CSS, Framer Motion et GSAP.

## Stack Technique

- **Next.js 14** (App Router) avec TypeScript
- **Supabase** — Database, Auth, Storage
- **Tailwind CSS** — Styling utility-first
- **Framer Motion** — Animations React (entrées, hovers, transitions de page)
- **GSAP** — Animations scroll-triggered (parallax, reveals)
- **Zustand** — State management (panier)
- **Lucide React** — Icônes

## Design System

| Token | Valeur | Usage |
|-------|--------|-------|
| Background | `#0A0A0A` | Fond principal |
| Surface | `#111111` | Cartes, éléments surélevés |
| Primary | `#C6A43F` | Or ambré — boutons, liens, accents |
| Secondary | `#4A0E17` | Bordeaux profond — badges promo |
| Text Primary | `#FFFFFF` | Titres, texte principal |
| Text Secondary | `#A0A0A0` | Descriptions, labels |

## Installation

```bash
cd sentel-parfums
npm install
```

## Configuration

Créez un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
```

## Setup Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Exécutez les migrations dans `supabase/migrations/001_init_schema.sql`
3. Activez l'authentification (Email) dans Authentication > Providers
4. Créez un bucket `products` dans Storage pour les images

### Créer un admin

```sql
-- Après inscription d'un utilisateur, l'ajouter comme admin
INSERT INTO admin_users (user_id, email)
VALUES ('uuid-de-l-utilisateur', 'admin@sentelparfums.ma');
```

## Lancer le projet

```bash
# Mode développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

## Structure du projet

```
sentel-parfums/
├── app/                    # Next.js App Router
│   ├── (shop)/
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── account/
│   │   └── page.tsx
│   ├── bundle/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── animations/         # AnimatedSection, StaggerContainer
│   ├── sections/           # Hero, Navbar, Footer, CartDrawer...
│   └── ui/                 # ProductCard, GlowCard, Toaster...
├── hooks/                  # useSupabase, useAuth
├── lib/
│   ├── supabase.ts         # Client Supabase
│   ├── store.ts            # Zustand cart store
│   └── utils.ts            # Helpers
├── types/                  # Types TypeScript
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql
└── public/
    └── images/
```

## Fonctionnalités

### Client
- **Homepage** — Hero animé, grille de produits, offre bundle, avis clients
- **Liste produits** — Filtres (famille olfactive, prix, marque), tri, recherche
- **Détail produit** — Carrousel, pyramide olfactive, avis, produits similaires
- **Bundle Builder** — Sélection de 3 parfums pour 200 MAD
- **Panier** — Drawer latéral avec animations spring
- **Checkout** — 2 étapes (livraison + paiement), méthodes COD/virement
- **Compte client** — Historique commandes, profil

### Admin
- **Dashboard** — Stats, commandes récentes
- **Produits** — CRUD avec recherche
- **Commandes** — Gestion des statuts

### Animations
- Logo respirant (scale + glow pulse)
- Hero parallax GSAP
- Cartes produit — fade up + hover glow
- Page transitions AnimatePresence
- Scroll-triggered reveals
- Cart drawer — spring physics

## SEO & Performance

- `next/image` pour l'optimisation images
- Metadata par page (title, description, OpenGraph)
- Schema markup injecté
- Lazy loading composants
- Polices Google Fonts optimisées

## Déploiement

Prêt pour [Vercel](https://vercel.com) :

```bash
vercel --prod
```

N'oubliez pas d'ajouter les variables d'environnement dans les paramètres Vercel.

## License

Propriétaire — Olivare Parfums
