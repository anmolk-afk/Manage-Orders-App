export const ORDERS_QUERY = `
  query GetOrders($first: Int!, $after: String) {
    orders(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          number
          name
          legacyResourceId
          displayFinancialStatus
          displayFulfillmentStatus

          subtotalPriceSet { shopMoney { amount currencyCode } }
          totalDiscountsSet { shopMoney { amount currencyCode } }
          totalShippingPriceSet { shopMoney { amount currencyCode } }
          totalTaxSet { shopMoney { amount currencyCode } }
          totalPriceSet { shopMoney { amount currencyCode } }

          lineItems(first: 250) {
            nodes {
              id
              name
            }
          }

          metafields(first: 10) {
            nodes {
              id
              namespace
              key
              value
              type
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const ORDER_BY_ID_QUERY = `
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      number
      name
      legacyResourceId
      displayFinancialStatus
      displayFulfillmentStatus

      subtotalPriceSet { shopMoney { amount currencyCode } }
      totalDiscountsSet { shopMoney { amount currencyCode } }
      totalShippingPriceSet { shopMoney { amount currencyCode } }
      totalTaxSet { shopMoney { amount currencyCode } }
      totalPriceSet { shopMoney { amount currencyCode } }

      lineItems(first: 250) {
        nodes {
          id
          name
        }
      }

      metafields(first: 10) {
        nodes {
          id
          namespace
          key
          value
          type
        }
      }
    }
  }
`;

export const UPDATE_ORDER_QUERY = `
  #graphql
  mutation OrderUpdate($input: OrderInput!) {
    orderUpdate(input: $input) {
      order {
        id
        number
        name
        legacyResourceId
        displayFinancialStatus
        displayFulfillmentStatus

        metafields(first: 10) {
          nodes {
            id
            namespace
            key
            value
            type
          }
        }
      }
      
      userErrors {
        field
        message
      }
    }
  }
`;