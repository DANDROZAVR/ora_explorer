// pages/api/activity/responses.js
import { getResponseActivity } from "../../../db/db_handler";

export default async function handler(req, res) {
  const { offset, address } = req.query;
  const activities = await getResponseActivity(parseInt(offset, 10) || 0, address || null);
  res.status(200).json(activities);
}