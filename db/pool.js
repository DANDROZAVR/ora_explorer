import pkg from 'pg';
const { Pool } = pkg;

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const global_pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Vercel Postgres requires SSL
  }
});

export {global_pool}