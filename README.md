# Novčanik

Personal finance PWA for tracking income and expenses, built for the Serbian market.

## Privacy & Security

This repository is public so anyone can verify how the app handles data.

**The author has no access to your data.** Every table in the database has Row Level Security (RLS) enforced at the database level — not just in application code. This means no query, script, or API call can return another user's data, regardless of who runs it.

You can verify this yourself by reading [`schema.sql`](./schema.sql).

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Supabase (PostgreSQL + Auth + RLS)
- React Router v7
- Recharts
- PWA (installable on Android and iOS)

## Running Locally

```bash
git clone https://github.com/radisakicos/novcanik.git
cd novcanik
npm install
```

Create a `.env` file based on `.env.example` and add your own Supabase project credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Run the database schema from [`schema.sql`](./schema.sql) in your Supabase SQL Editor, then:

```bash
npm run dev
```

## License

Source available for review. Redistribution, hosting, or commercial use without written permission is not allowed.
