export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const response = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/settings?limit=1`, {
    headers: {
      'apikey': process.env.VITE_SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
    },
  })

  if (!response.ok) {
    return res.status(500).json({ error: 'Supabase ping failed' })
  }

  res.status(200).json({ ok: true, timestamp: new Date().toISOString() })
}
