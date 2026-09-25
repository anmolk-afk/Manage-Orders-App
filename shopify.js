import { AppError } from "./errors.js";

export class ShopifyClient {
  constructor({
    shop,
    clientId,
    clientSecret,
    apiVersion = "2026-07",
    fetchImpl = fetch,
  }) {
    if (!clientId) throw new Error("SHOPIFY_API_KEY is required");
    if (!clientSecret) throw new Error("SHOPIFY_API_SECRET is required");
    if (!shop) throw new Error("SHOPIFY_SHOP is required");

    this.shop = shop;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiVersion = apiVersion;
    this.fetch = fetchImpl;
    this.token = null;
    this.tokenExpiresAt = 0;
  }

  async getAccessToken() {
    if (this.token && Date.now() < this.tokenExpiresAt - 60_000) return this.token;

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const response = await this.fetch(
      `https://${this.shop}/admin/oauth/access_token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );

    const payload = await response.json();

    if (!response.ok || !payload.access_token) {
      throw new AppError(
        "Shopify rejected the client-credentials request",
        response.status,
        payload,
      );
    }

    this.token = payload.access_token;
    this.tokenExpiresAt = Date.now() + Number(payload.expires_in ?? 86_399) * 1000;
    return this.token;
  }

  async graphql(query, variables = {}) {
    const accessToken = await this.getAccessToken();
    const response = await this.fetch(
      `https://${this.shop}/admin/api/${this.apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
        body: JSON.stringify({ query, variables }),
      },
    );
    const payload = await response.json();

    if (!response.ok || payload.errors) {
      throw new AppError(
        "Shopify GraphQL request failed",
        response.status,
        payload
      );
    }

    return payload.data;
  }
}