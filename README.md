# Marsilia Food

Application de gestion pour restaurant — React + TypeScript + Vite + Tailwind CSS + Supabase.

## Démarrage local

1. Installer Node.js (version LTS recommandée).
2. Copier `.env.example` vers `.env.local`.
3. Renseigner `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
4. Installer les dépendances : `npm install`
5. Lancer : `npm run dev`

## Vérifications

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Supabase

Les migrations SQL sont dans `supabase/migrations/`. Elles doivent être exécutées sur ton propre projet Supabase avant utilisation.

## Déploiement

Le frontend Vite peut être déployé sur un hébergeur compatible avec les applications statiques. Les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` doivent être configurées dans l’environnement de production.

## Indépendance de Bolt

Le dossier `.bolt/` a été retiré de cette version. Le projet peut être versionné et déployé depuis GitHub ou tout autre environnement Git/Node/Vite.

**Important :** cette version conserve l’architecture et les fonctionnalités présentes dans le projet source. La sécurisation multi-restaurant et l’authentification de production restent à traiter avant une commercialisation multi-client.
