const BASE_URL = "http://localhost:3000"

const test_get_orders = async (take, cursor) => {
  const queryObj = {}
  if (take) queryObj.take = take;
  if (cursor) queryObj.cursor = cursor;

  const queryStr = new URLSearchParams(queryObj).toString();
  const res = await fetch(`${BASE_URL}/orders?${queryStr}`);

  const data = await res.json();
  if (!res.ok) console.log("Error fetching orders:", { "message": data.message, "details": data.details?.errors });
  else {
    console.log("Fetched Orders:", data);
    return data.pageInfo;
  }
}

const test_get_order_by_id = async (id) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`);

  const data = await res.json();
  if (!res.ok) console.log("Error fetching Order By Id:", { "message": data.message, "details": data.details?.errors });
  else console.log("Fetched Order By Id:", data);
}

const test_update_order = async (id, input) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });

  const data = await res.json();
  if (!res.ok) console.log("Error updating order:", { "message": data.message, "details": data.details?.errors });
  else console.log("Updated order:", data);
}

// Fetch All Orders
let nextPage = true, cursor = null;
while (nextPage) {
  const next = await test_get_orders(3, cursor);
  if (!next.hasNextPage) nextPage = false;
  else cursor = next.endCursor;
}

// Fetch Order By ID
await test_get_order_by_id(7287688069370);

// Update Order Metafields
await test_update_order(7287688069370, {
  "namespace": "custom",
  "key": "ai_status",
  "value": "processed",
  "type": "single_line_text_field"
});


