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
      const tags = await prisma.tagType.findMany({
        orderBy: { label: 'asc' }
      });
      const tagInfo = {};
      tags.forEach(tag => {
        tagInfo[tag.tagKey] = { label: tag.label, type: tag.type };
      });
      return res.status(200).json(tagInfo);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
