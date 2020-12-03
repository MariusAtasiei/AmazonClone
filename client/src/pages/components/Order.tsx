import React from "react"
import moment from "moment"
import { basketMap } from "../Checkout"
// @ts-ignore
import CurrencyFormat from "react-currency-format"
import { getTotal } from "./Subtotal"
import "../style/Order.scss"

function Order({ _id, basket, createdAt }: any) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment(createdAt).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{_id}</small>
      </p>

      {basketMap(basket, true)}

      <CurrencyFormat
        renderText={(value: number) => (
          <h3 className="order__total">Total: {value}</h3>
        )}
        decimalScale={2}
        value={getTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
    </div>
  )
}

export default Order
