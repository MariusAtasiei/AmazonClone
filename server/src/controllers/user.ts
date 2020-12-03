import { Request, Response } from "express"
import { NativeError } from "mongoose"
import Order from "../models/order"

const stripe = require("stripe")(process.env.STRIPE_KEY)

export const payment = async (req: Request, res: Response) => {
  const { total } = req.query

  try {
    const { client_secret } = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    })
    return res.json({ clientSecret: client_secret })
  } catch ({ message }) {
    return res.json({ error: message })
  }
}

export const createOrder = (req: Request, res: Response) => {
  const { body } = req

  try {
    const newOrder = Order.create(body)

    return res.json({ order: newOrder })
  } catch ({ message }) {
    return res.json({ error: message })
  }
}

export const getOrders = (req: Request, res: Response) => {
  const { fields, ...filters } = req.query

  const findOrders = Order.find(filters).select(fields)

  findOrders.exec((err: NativeError, orders: any[]) => {
    if (err) {
      return res.json({ error: err.message })
    } else if (!orders) {
      return res.json({ error: "No orders" })
    }

    return res.json({ orders })
  })
}

export const getOrdersByUser = (req: Request, res: Response) => {
  const { userId } = req.params

  const findOrders = Order.find({ userId }).select("-__v")

  findOrders.exec((err: NativeError, orders: any[]) => {
    if (err) return res.json({ error: err.message })
    else if (!orders.length) return res.json({ error: "No orders found" })

    return res.json({ orders })
  })
}
