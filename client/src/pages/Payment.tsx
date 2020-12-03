import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useStateValue } from "../context/StateProvider"
import { basketMap } from "./Checkout"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
// @ts-ignore
import CurrencyFormat from "react-currency-format"
import { getTotal } from "./components/Subtotal"
import axios from "axios"
import "./style/Payment.scss"

function Payment() {
  const [{ user, basket }, dispatch] = useStateValue()

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [clientSecret, setClientSecret]: [any, any] = useState(true)
  const [processing, setProcessing] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const url: string = `${process.env.REACT_APP_API_URL}/user/payment?total=${
      getTotal(basket) * 100
    }`

    axios.get(url).then(({ data }: any) => {
      setClientSecret(data.clientSecret)
    })
  }, [basket])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setProcessing(true)

    // @ts-ignore
    const payment_method = { card: elements.getElement(CardElement) }

    const payMethod = { payment_method }

    // @ts-ignore
    const stripePromise = stripe?.confirmCardPayment(clientSecret, payMethod)

    // @ts-ignore
    await stripePromise.then(({ paymentIntent }) => {
      setSucceeded(true)
      setError(null)
      setProcessing(false)
    })

    dispatch({ type: "EMPTY_BASKET" })

    const url: string = `${process.env.REACT_APP_API_URL}/user/order`

    const data = {
      basket,
      userId: user ? user._id : undefined,
      amount: getTotal(basket),
    }

    await axios.post(url, data)

    history.replace("/orders")
  }

  const handleChange = ({ empty, error }: any) => {
    setDisabled(empty)
    setError(error ? error.message : "")
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        <div className="payment__container__section">
          <div className="payment__container__section__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__container__section__address">
            <p>{user?._username}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__container__section">
          <div className="payment__container__section__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__container__section__items">
            {basketMap(basket, false)}
          </div>
        </div>

        <div className="payment__container__section">
          <div className="payment__container__section__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__container__section__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__container__section__details__price">
                <CurrencyFormat
                  renderText={(value: number) => <h3>Total: {value}</h3>}
                  decimalScale={2}
                  value={getTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
