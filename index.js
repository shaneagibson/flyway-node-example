const express = require('express');
const { Pool } = require('pg')

const port = 3000;

const postgres = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

postgres.on('connect', (client) => {
  client.query(`SET search_path TO ${process.env.DB_SCHEMA}`);
});

const app = express();

app.get('/users', (request, response) => {
  postgres
    .query(`SELECT * FROM users`)
    .then(result => response.status(200).type('json').send(result.rows))
    .catch(error => response.status(500).type('json').send(error));
});

app.listen(port, () => {
  console.log(`myservice started on port ${port}`);
});