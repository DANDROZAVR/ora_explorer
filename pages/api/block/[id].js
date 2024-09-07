// pages/api/block/[id].js

import { getBlockInfo, getOppositeTransaction } from '../../../db/db_handler';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const blockInfo = await getBlockInfo(id);
    if (blockInfo) {
      let opposite = null;
      if (blockInfo.req_id) {
        opposite = await getOppositeTransaction(blockInfo.req_id);
      }
      res.status(200).json({ ...blockInfo, opposite });
    } else {
      res.status(404).json({ message: 'Block not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
