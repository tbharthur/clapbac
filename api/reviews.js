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
      const { reviewerId, restaurantId, recent, limit = 50 } = req.query;

      if (reviewerId) {
        const reviews = await prisma.review.findMany({
          where: { reviewerId },
          include: { restaurant: true },
          orderBy: { date: 'desc' }
        });
        return res.status(200).json(reviews.map(transformReview));
      }

      if (restaurantId) {
        const reviews = await prisma.review.findMany({
          where: { restaurantId },
          include: { reviewer: true },
          orderBy: { date: 'desc' }
        });
        return res.status(200).json(reviews.map(transformReview));
      }

      if (recent) {
        const limitNum = Math.min(parseInt(limit) || 10, 50);
        const reviews = await prisma.review.findMany({
          include: { restaurant: true, reviewer: true },
          orderBy: { date: 'desc' },
          take: limitNum
        });
        return res.status(200).json(reviews.map(transformReview));
      }

      const reviews = await prisma.review.findMany({
        include: { restaurant: true, reviewer: true },
        orderBy: { date: 'desc' },
        take: 100
      });
      return res.status(200).json(reviews.map(transformReview));
    }

    if (req.method === 'POST') {
      const { reviewerId, restaurantId, rating, content, flags, categories } = req.body;

      if (!reviewerId || !restaurantId || !rating || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const id = `rev-${Date.now()}`;
      const date = new Date();

      const review = await prisma.review.create({
        data: {
          id,
          reviewerId,
          restaurantId,
          rating,
          content,
          date,
          flags: flags || [],
          categories: categories || {}
        }
      });

      // Update reviewer's aggregate rating
      const avgResult = await prisma.review.aggregate({
        where: { reviewerId },
        _avg: { rating: true },
        _count: true
      });

      await prisma.reviewer.update({
        where: { id: reviewerId },
        data: {
          aggregateRating: avgResult._avg.rating || 0,
          totalRestaurantReviews: avgResult._count
        }
      });

      return res.status(201).json({ id: review.id, message: 'Review created successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

function transformReview(row) {
  return {
    id: row.id,
    reviewerId: row.reviewerId,
    restaurantId: row.restaurantId,
    rating: row.rating,
    content: row.content,
    date: row.date,
    verified: row.verified,
    helpful: row.helpful,
    flags: row.flags || [],
    categories: row.categories || {},
    // Joined fields
    restaurantName: row.restaurant?.name,
    restaurantInitials: row.restaurant?.initials,
    restaurantColor: row.restaurant?.color,
    reviewerName: row.reviewer?.displayName
  };
}
