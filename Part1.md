## Tables
```sql
CREATE TABLE authors (
    id serial PRIMARY KEY,
    name text,
    email text,
    date_of_birth timestamp
);

CREATE TABLE books (
    id serial PRIMARY KEY,
    author_id integer REFERENCES authors (id),
    isbn text
);

CREATE TABLE sale_items (
    id serial PRIMARY KEY,
    book_id integer REFERENCES books (id),
    customer_name text,
    item_price money,
    quantity integer
);
```
### 1. Who are the first 10 authors ordered by date_of_birth?
```SQL
SELECT name
FROM authors
ORDER BY date_of_birth
LIMIT 10;
```

### 2. What is the sales total for the author named “Lorelai Gilmore”?
```SQL
SELECT SUM(si.item_price * si.quantity) AS total_sales
FROM authors a
JOIN books b ON a.id = b.author_id
JOIN sale_items si ON b.id = si.book_id
WHERE a.name = 'Lorelai Gilmore';
```

### 3. What are the top 10 performing authors, ranked by sales revenue?
```SQL
SELECT a.name, a.email, SUM(si.item_price * si.quantity) AS total_sales
FROM authors a
JOIN books b ON a.id = b.author_id
JOIN sale_items si ON b.id = si.book_id
GROUP BY a.name, a.email
ORDER BY total_sales DESC
LIMIT 10;
```