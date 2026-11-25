# Agent guide

## What this repository does

This is a small Node.js (ES modules) Express API that reads Shopify orders and updates order metafields through the Shopify Admin GraphQL API. It is a backend service; there is no frontend or local database.

## Architecture

- `index.js` creates the Express app, loads environment variables, installs JSON and URL-encoded body parsing, exposes `GET /` service information, mounts the order router, installs the error handler, and listens on `PORT` (default `5000`).
- `src/routes.js` maps `GET /orders`, `GET /orders/:id`, and `PATCH /orders/:id` to controller functions.
- `src/controllers.js` translates HTTP inputs to Shopify GraphQL variables and shapes successful responses. It constructs Shopify order GIDs from the numeric `:id` route parameter and forwards thrown errors to Express.
- `src/config/graphql.js` holds the GraphQL documents for listing orders, retrieving one order, and updating an order's metafields. Keep Shopify field selection and mutation changes here.
- `src/config/shopify.js` implements Shopify client-credentials token acquisition/caching and authenticated Admin GraphQL requests. It uses `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SHOPIFY_SHOP`, and optionally `SHOPIFY_API_VERSION` (default `2026-07`).
- `src/config/errors.js` defines `AppError` and the final Express error middleware. Known `AppError`s return their status/message/details; unexpected errors are logged and returned as HTTP 500.
- `tests.js` is a standalone manual HTTP client script, not an automated test suite.

Request flow: Express middleware → route → controller → `ShopifyClient.graphql()` → Shopify Admin API; failures pass back through `next(err)` to the error middleware.

## Working in the repository

- Use `npm run dev` to start the server with nodemon. The API listens on port `5000` unless `PORT` is set.
- Configure the Shopify environment variables locally. Keep credentials in `.env`; do not commit secrets.
- `GET /orders` accepts optional `take` and `cursor` query parameters and returns `orders` and `pageInfo`. `GET /orders/:id` takes the numeric Shopify order ID (not a full GID). `PATCH /orders/:id` accepts `namespace`, `key`, `value`, and `type`; omitted values have defaults in the controller.
- The package's `npm test` script is a placeholder that exits with an error. `tests.js` calls `http://localhost:3000`, which does not match the server's default port; set `PORT=3000` when running the server for that script, or update the script if intentionally changing its default.
- There is no build or lint script configured. Keep changes consistent with the existing JavaScript ES module style and the established route/controller/config separation.
