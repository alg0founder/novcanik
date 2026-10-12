# Novčanik

Besplatna PWA aplikacija za praćenje ličnih finansija, napravljena za srpsko tržište.

Dostupna na: [novcanik.vercel.app](https://novcanik.vercel.app)

---

## Privatnost

Repozitorijum je javan da bi svako mogao da proveri kako aplikacija rukuje podacima.

- **Email adresa** se potvrđuje linkom, ali može biti bilo koja adresa, ne mora biti vezana za vaše ime
- **Ime i prezime** su opcioni
- **Svaki nalog** kroz aplikaciju i API vidi samo svoje podatke (RLS na nivou baze)
- **Administrator baze** tehnički ima pristup svim podacima; ne koristi ih i ne deli
- **Brisanje naloga**: korisnik sam briše nalog i sve podatke iz Podešavanja

### Zaštita podataka

Svaka tabela u bazi ima Row Level Security (RLS) primenjen na nivou baze, ne samo u kodu aplikacije. Nijedan upit sa korisničkim ključem ne može da vrati podatke drugog korisnika.

Ovo možete sami proveriti čitanjem [`schema.sql`](./schema.sql).

---

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Supabase (PostgreSQL + Auth + RLS)
- React Router v7
- Recharts
- PWA (instalabilno na Android i iOS)

---

## Pokretanje lokalno

```bash
git clone https://github.com/alg0founder/novcanik.git
cd novcanik
npm install
```

Napravite `.env` fajl prema `.env.example` i dodajte sopstvene Supabase kredencijale:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
# opciono: Cloudflare Turnstile site key; bez njega provera "nisam robot" je isključena
VITE_TURNSTILE_SITE_KEY=
```

Pokrenite šemu baze iz [`schema.sql`](./schema.sql) u Supabase SQL Editoru, pa redom fajlove iz [`migrations/`](./migrations/), zatim:

```bash
npm run dev
```

---

## Licenca

Kod je dostupan na uvid. Redistribucija, hostovanje ili komercijalna upotreba bez pisane dozvole nisu dozvoljeni.
