Get Orders: curl http://localhost:3000/orders?take=2&cursor=eyJsYXN0X2lkIjo3Mjg3Njg3MzE1NzA2LCJsYXN0X3ZhbHVlIjoiMjAyNi0wOS0yNCAxMToxMTo0NC4zNjg2MTcifQ==

Get Order By Id: curl http://localhost:3000/orders/7287688069370

Update Order Metafield: curl -X PATCH http://localhost:3000/orders/7287688069370 -H "Content-Type: application/json" -d "{\"namespace\":\"custom\",\"key\":\"ai_status\",\"value\":\"processed\",\"type\":\"single_line_text_field\"}"
