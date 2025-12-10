import { prisma } from './lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { id } = req.query;

      if (id) {
        const restaurant = await prisma.restaurant.findUnique({
          where: { id }
        });
        if (!restaurant) {
          return res.status(404).json({ error: 'Restaurant not found' });
        }
        return res.status(200).json(transformRestaurant(restaurant));
      }

      const restaurants = await prisma.restaurant.findMany({
        orderBy: { name: 'asc' }
      });
      return res.status(200).json(restaurants.map(transformRestaurant));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}

function transformRestaurant(row) {
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    color: row.color,
    location: row.location
  };
}
