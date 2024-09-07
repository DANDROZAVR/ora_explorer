// pages/api/event/[id].js

import { getEventInfo, getOppositeTransaction } from '../../../db/db_handler';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const eventInfo = await getEventInfo(id);

    if (eventInfo) {
      let opposite = null;
      if (eventInfo.req_id) {
        // Get the type of the event
        const eventType = eventInfo.type; // 'request' or 'response'

        // Fetch the opposite transaction
        opposite = await getOppositeTransaction(eventInfo.req_id, eventType);
      }

      // Include the type in the response
      res.status(200).json({ ...eventInfo, opposite });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
