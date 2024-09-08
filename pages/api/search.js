// pages/api/search.js
import { getRequestById, getResponseById } from '../../db/db_handler';

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    // Check for transaction ID in requests
    let result = await getRequestById(query);

    if (!result) {
      // Check for transaction ID in responses if not found in requests
      result = await getResponseById(query);
    }

    if (result) {
      res.status(200).json({ found: true });
    } else {
      res.status(200).json({ found: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
