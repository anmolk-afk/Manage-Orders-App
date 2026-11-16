import { Router } from "express";
import { getOrderById, getOrders, updateOrder } from "./controllers.js";

// some modifications
const router = Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id', updateOrder);

export default router;
// This was test commit to check PR review
// return sample response
