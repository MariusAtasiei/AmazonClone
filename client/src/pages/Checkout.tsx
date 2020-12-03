import React, { forwardRef } from "react"
import Subtotal from "./components/Subtotal"
import "./style/Checkout.scss"
import CheckoutProduct from "./components/CheckoutProduct"
import { useStateValue } from "../context/StateProvider"
import FlipMove from "react-flip-move"

function Checkout() {
  const { basket } = useStateValue()[0]

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492667_.jpg"
          alt=""
          className="checkout__ad"
        />

        <div>
          <h2 className="checkout__title">Your shoppping Basket</h2>
        </div>

        {basketMap(basket, false)}
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export const basketMap = (basket: any, hideButton: boolean) => (
  <FlipMove>
    {basket.map(({ id, title, image, price, rating }: any) => (
      <FunctionalProduct
        id={id}
        title={title}
        image={image}
        price={price}
        rating={rating}
        hideButton={hideButton}
      />
    ))}
  </FlipMove>
)

const FunctionalProduct = forwardRef(
  ({ id, title, image, price, rating, hideButton }: any, ref: any) => (
    <div ref={ref}>
      <CheckoutProduct
        id={id}
        title={title}
        image={image}
        price={price}
        rating={rating}
        hideButton={hideButton}
      />
    </div>
  )
)

export default Checkout
