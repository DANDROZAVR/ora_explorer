// lib/db.js


// Fetch requests
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

// db/db_handler.js

export async function getRequestById(id) {
  const result = await pool.query('SELECT * FROM prompt_requests WHERE tx_id = $1', [id]);
  return result.rows[0];
}

export async function getResponseById(id) {
  const result = await pool.query('SELECT * FROM prompt_answers WHERE tx_id = $1', [id]);
  return result.rows[0];
}

export async function getBlockInfo(tx_id) {
  // Function to get block information
  const query = `
    SELECT * FROM prompt_requests WHERE tx_id = $1
    UNION ALL
    SELECT * FROM prompt_answers WHERE tx_id = $1
  `;
  const result = await global_pool.query(query, [tx_id]);
  return result.rows[0]; // Return the first result
}

export async function getOppositeTransaction(request_id) {
  // Function to get opposite request or response
  const query = `
    SELECT tx_id FROM prompt_requests WHERE req_id = $1
    UNION
    SELECT tx_id FROM prompt_answers WHERE req_id = $1
  `;
  const result = await global_pool.query(query, [request_id]);
  return result.rows[0]; // Return the first result
}

