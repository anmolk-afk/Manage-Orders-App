import { ORDERS_QUERY, ORDER_BY_ID_QUERY, UPDATE_ORDER_QUERY } from './config/graphql.js';
import { ShopifyClient } from './config/shopify.js';
import 'dotenv/config';

// edited
const shopifyClient = new ShopifyClient({
  clientId: process.env.SHOPIFY_API_KEY,
  clientSecret: process.env.SHOPIFY_API_SECRET,
  apiVersion: process.env.SHOPIFY_API_VERSION,
  shop: process.env.SHOPIFY_SHOP,
});

export const getOrders = async (req, res, next) => {
  try {
    const first = Number(req.query?.take) || 10;
    const after = req.query?.cursor;

    const data = await shopifyClient.graphql(ORDERS_QUERY, { first, after });
    return res.status(200).json({ orders: data.orders.edges, pageInfo: data.orders.pageInfo });
  }
  catch (e) {
    next(e);
  }
}

export const getOrderById = async (req, res, next) => {
  try {
    const id = `gid://shopify/Order/${req.params.id}`;
    const data = await shopifyClient.graphql(ORDER_BY_ID_QUERY, { id });
    return res.status(200).json(data.order);
  }
  catch (e) {
    next(e);
  }
}

export const updateOrder = async (req, res, next) => {
  try {
    const id = `gid://shopify/Order/${req.params.id}`;
    const body = req.body;

    const metafields = [{
      namespace: body.namespace || "custom",
      key: body.key || "ai_status",
      value: body.value || "processed",
      type: body.type || "single_line_text_field"
    }]

    const data = await shopifyClient.graphql(UPDATE_ORDER_QUERY, { input: { id, metafields } });
    return res.status(200).json(data);
  }
  catch (e) {
    next(e);
  }
}
