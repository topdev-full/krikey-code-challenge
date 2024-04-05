const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Set up PostgreSQL connection with a larger pool size
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'password',
  port: 5432,
  max: 20, // Increase max pool size based on your server's capability
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Simple in-memory cache implementation
let cache = {};

app.get('/api/authors', async (req, res) => {
  const authorName = req.query.author_name;
  const cacheKey = authorName || 'all';

  // Check if we have cached data
  if (cache[cacheKey]) {
    return res.json(cache[cacheKey]);
  }

  try {
    let query;
    if (authorName) {
      query = {
        text: `SELECT a.name, SUM((si.item_price::numeric) * si.quantity) AS total_sales
               FROM authors a
               JOIN books b ON a.id = b.author_id
               JOIN sale_items si ON b.id = si.book_id
               WHERE a.name = $1
               GROUP BY a.name
               ORDER BY total_sales DESC
               LIMIT 10`,
        values: [authorName],
      };
    } else {
      query = {
        text: `SELECT a.name, SUM((si.item_price::numeric) * si.quantity) AS total_sales
               FROM authors a
               JOIN books b ON a.id = b.author_id
               JOIN sale_items si ON b.id = si.book_id
               GROUP BY a.name
               ORDER BY total_sales DESC
               LIMIT 10`,
      };
    }

    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Author not found or has no sales' });
    }

    // Store the result in cache
    cache[cacheKey] = rows;

    // Set a timeout to clear the cache for this key
    setTimeout(() => {
      delete cache[cacheKey];
    }, 10000); // Cache expiration time in milliseconds

    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});