## Write an API Endpoint
#### You’ve been asked to write a simple API endpoint that optionally accepts an author’s name and returns a JSON response using the query from part one question three (top 10 performing authors). We use NodeJS, but please use a language of your choice such as NodeJS, python, or Go. The endpoint itself should be a GET operation that takes a query parameter called author_name. You are free to choose any URL or route name you wish. If a call to the endpoint is an invalid or non-existent author name given to the author_name parameter, the API should return an error with an HTTP status code indicating what went wrong.
```javascript
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

app.get('/api/authors', async (req, res) => {
  const authorName = req.query.author_name;

  try {
    let query;
    if (authorName) {
      query = {
        text: `SELECT a.name, a.email, SUM((si.item_price::numeric) * si.quantity) AS total_sales
               FROM authors a
               JOIN books b ON a.id = b.author_id
               JOIN sale_items si ON b.id = si.book_id
               WHERE a.name = $1
               GROUP BY a.name, a.email
               ORDER BY total_sales DESC
               LIMIT 10`,
        values: [authorName],
      };
    } else {
      query = {
        text: `SELECT a.name, a.email, SUM((si.item_price::numeric) * si.quantity) AS total_sales
               FROM authors a
               JOIN books b ON a.id = b.author_id
               JOIN sale_items si ON b.id = si.book_id
               GROUP BY a.name, a.email
               ORDER BY total_sales DESC
               LIMIT 10`,
      };
    }

    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Author not found or has no sales' });
    }
    res.json(rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```

## API Performance
#### Please optimize your endpoint code from part 2A for performance for an estimated traffic of 1000 simultaneous users concurrently.
```javascript
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Set up PostgreSQL connection with a larger pool size
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
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
        text: `SELECT a.name, a.email, SUM((si.item_price::numeric) * si.quantity) AS total_sales
               FROM authors a
               JOIN books b ON a.id = b.author_id
               JOIN sale_items si ON b.id = si.book_id
               WHERE a.name = $1
               GROUP BY a.name, a.email
               ORDER BY total_sales DESC
               LIMIT 10`,
        values: [authorName],
      };
    } else {
      query = {
        text: `SELECT a.name, a.email, SUM((si.item_price::numeric) * si.quantity) AS total_sales
               FROM authors a
               JOIN books b ON a.id = b.author_id
               JOIN sale_items si ON b.id = si.book_id
               GROUP BY a.name, a.email
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

```