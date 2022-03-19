export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REGENERATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    return res.status(200).json({ revalidated: true, req: req.query })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
