import { Router } from "express"
import {
  createOrder,
  getOrders,
  getOrdersByUser,
  payment,
} from "../controllers/user"

const router = Router()

router.get("/payment", payment)

router.route("/order").post(createOrder).get(getOrders)

router.get("/orders/:userId", getOrdersByUser)

export default router
