# Novčanik

Besplatna PWA aplikacija za praćenje ličnih finansija, napravljena za srpsko tržište.

Dostupna na: [novcanik.vercel.app](https://novcanik.vercel.app)

---

## Privatnost i anonimnost

Repozitorijum je javan kako bi svako mogao da proveri kako aplikacija rukuje podacima korisnika.

Aplikacija je dizajnirana od temelja sa ciljem da ne zna ko ste vi:

- **Email adresa** se ne verifikuje kao lični identitet — možete koristiti bilo koji email
- **Ime i prezime** nisu obavezni i ne proveravaju se
- **Pristupni kodovi** (invite) generišu se nasumično i automatski se brišu nakon 7 dana — ne postoji zapis o tome kome je koji kod dodeljen
- **U bazi podataka** vaš nalog postoji isključivo kao nasumični tehnički identifikator (UUID)

Rezultat je da ne postoji mogućnost da se podaci u aplikaciji povežu sa stvarnim identitetom korisnika.

### Zaštita podataka

Svaka tabela u bazi ima Row Level Security (RLS) primenjen na nivou baze, ne samo u kodu aplikacije. Nijedan upit, skripta niti API poziv ne može da vrati podatke drugog korisnika.

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
```

Pokrenite šemu baze iz [`schema.sql`](./schema.sql) u Supabase SQL Editoru, zatim:

```bash
npm run dev
```

---

## Licenca

Kod je dostupan na uvid. Redistribucija, hostovanje ili komercijalna upotreba bez pisane dozvole nisu dozvoljeni.
