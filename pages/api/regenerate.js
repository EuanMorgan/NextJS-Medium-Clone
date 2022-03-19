export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({
      message: 'Invalid token',
      token: process.env.REVALIDATE_SECRET,
      you_sent: req.body,
    })
  }

  try {
    return res.status(200).json({ revalidated: true, req: req.query })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
