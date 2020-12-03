import axios from "axios"
import React, { useEffect, useState } from "react"
import { useStateValue } from "../context/StateProvider"
import Order from "./components/Order"
import "./style/Orders.scss"

function Orders() {
  const { user } = useStateValue()[0]
  const [orders, setOrders]: [any, any] = useState("")

  useEffect(() => {
    if (!user) {
      setOrders("You must be logged in to see your orders")
      return
    }

    console.log(user._id)
    const url: string = `${process.env.REACT_APP_API_URL}/user/orders/${user._id}`
    console.log(url)

    axios
      .get(url)
      .then(({ data }) => setOrders(data.orders))
      .catch((err) => setOrders("No orders found"))
  }, [user])

  if (typeof orders === "string") {
    if (orders === "") return <div></div>
    else if (orders.includes("logged"))
      return (
        <div>
          <h4>{orders}</h4>
        </div>
      )

    return (
      <div>
        <h3>Your orders</h3>
        <h4>{orders}</h4>
      </div>
    )
  }

  return (
    <div className="orders">
      <h3>Your orders</h3>
      <div>
        {orders.map(({ _id, basket, createdAt }: any) => (
          <Order _id={_id} basket={basket} createdAt={createdAt} />
        ))}
      </div>
    </div>
  )
}

export default Orders
