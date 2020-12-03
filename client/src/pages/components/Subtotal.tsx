import React from "react"
import "../style/Subtotal.scss"
// @ts-ignore
import * as CurrencyFormat from "react-currency-format"
import { useStateValue } from "../../context/StateProvider"
import { Link } from "react-router-dom"

function Subtotal() {
  const { basket } = useStateValue()[0]

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value: number) => (
          <>
            <p>
              Subtotal ({basket.length} items) : <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />
      <Link to="/payment">
        <button>Procced to checkout</button>
      </Link>
    </div>
  )
}

export const getTotal = (products: any[]) => products?.reduce(accumulate, 0)

const accumulate = (amount: any, { price }: any) => amount + price

export default Subtotal
