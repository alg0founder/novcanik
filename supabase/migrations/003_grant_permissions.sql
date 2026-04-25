-- 003_grant_permissions.sql
-- Grant pristup authenticated korisnicima (potrebno jer je "Automatically expose new tables" isključeno)

grant usage on schema public to anon, authenticated;

grant select, insert, update, delete on public.transactions to authenticated;
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.budget_rules to authenticated;
grant select, insert, update, delete on public.settings to authenticated;
