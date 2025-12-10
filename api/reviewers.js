import { prisma } from './lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { id, search } = req.query;

      if (id) {
        const reviewer = await prisma.reviewer.findUnique({
          where: { id }
        });
        if (!reviewer) {
          return res.status(404).json({ error: 'Reviewer not found' });
        }
        return res.status(200).json(transformReviewer(reviewer));
      }

      if (search) {
        const reviewers = await prisma.reviewer.findMany({
          where: {
            OR: [
              { displayName: { contains: search, mode: 'insensitive' } },
              { location: { contains: search, mode: 'insensitive' } },
            ]
          },
          orderBy: { aggregateRating: 'desc' },
          take: 20
        });
        return res.status(200).json(reviewers.map(transformReviewer));
      }

      const reviewers = await prisma.reviewer.findMany({
        orderBy: { aggregateRating: 'desc' }
      });
      return res.status(200).json(reviewers.map(transformReviewer));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

function transformReviewer(row) {
  return {
    id: row.id,
    displayName: row.displayName,
    realNameInitial: row.realNameInitial,
    platforms: row.platforms || [],
    handles: row.handles || {},
    avatar: row.avatar,
    location: row.location,
    publicReviewCount: row.publicReviewCount,
    memberSince: row.memberSince,
    eliteStatus: row.eliteStatus,
    eliteYears: row.eliteYears || [],
    followers: row.followers,
    aggregateRating: parseFloat(row.aggregateRating),
    totalRestaurantReviews: row.totalRestaurantReviews,
    tags: row.tags || [],
    bio: row.bio,
    recentActivity: row.recentActivity
  };
}
