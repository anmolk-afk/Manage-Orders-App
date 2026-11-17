## 1. Get Orders

**Purpose:** Fetch a list of orders with pagination.

**Inputs (Query):**

- `take` — Number of orders to fetch (optional).
- `cursor` — Pagination cursor (optional).

**Output:** JSON containing the requested orders and pagination information.

---

## 2. Get Order By ID

**Purpose:** Fetch details of a specific order.

**Input Param:** — Shopify Order ID (Only Number part at end).

**Output:** JSON containing the order details.

---

## 3. Update Order Metafield

**Purpose:** Create or update a metafield on a specific order.

**Input Param:** — Shopify Order ID (Only Number part at end).

**Inputs (Body):**

- `namespace` — Metafield namespace.
- `key` — Metafield key.
- `value` — Metafield value.
- `type` — Metafield data type.

**Output:** JSON containing the updated order and metafield details.
