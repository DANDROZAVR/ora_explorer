// lib/db.js

import {global_pool} from "./pool";

// Get request activities with request_id
export async function getRequestActivity(offset = 0) {
  const query = `
    SELECT tx_id, req_id, chain_id, user_address, text, timestamp
    FROM prompt_requests
    ORDER BY timestamp DESC
    LIMIT 20 OFFSET $1
  `;
  const values = [offset];
  const result = await global_pool.query(query, values);
  return result.rows;
}

// Get response activities with request_id
export async function getResponseActivity(offset = 0) {
  const query = `
    SELECT tx_id, req_id, chain_id, user_address, text, timestamp
    FROM prompt_answers
    ORDER BY timestamp DESC
    LIMIT 20 OFFSET $1
  `;
  const values = [offset];
  const result = await global_pool.query(query, values);
  return result.rows;
}
export async function getRequestById(id) {
  const result = await global_pool.query('SELECT tx_id, req_id, chain_id, user_address, text, block_number FROM prompt_requests WHERE tx_id = $1', [id]);
  return result.rows[0];
}

export async function getResponseById(id) {
  const result = await global_pool.query('SELECT tx_id, req_id, chain_id, user_address, text, block_number FROM prompt_answers WHERE tx_id = $1', [id]);
  return result.rows[0];
}

export async function getBlockInfo(tx_id) {
  // Function to get block information
  const query = `
    SELECT 'request' AS type, tx_id, req_id, chain_id, user_address, text, block_number, timestamp
    FROM prompt_requests WHERE tx_id = $1
    UNION ALL
    SELECT 'response' AS type, tx_id, req_id, chain_id, user_address, text, block_number, timestamp
    FROM prompt_answers WHERE tx_id = $1
  `;
  const result = await global_pool.query(query, [tx_id]);
  return result.rows[0]; // Return the first result
}

export async function getOppositeTransaction(request_id, original_type) {
  const table = original_type != 'request' ? 'prompt_requests' : 'prompt_answers';
  const query = `
    SELECT tx_id FROM ${table} WHERE req_id = $1
  `;
  const result = await global_pool.query(query, [request_id]);
  if (result.rows.length == 0) {
    return null
  }
  return result.rows[0];
}
