import { Router } from "express";
import { getOrderById, getOrders, updateOrder } from "./controllers.js";

// some modifications
const router = Router();

router.get('/orders', getOrders); # hyihefrieruhu
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id', updateOrder);

export default router;
