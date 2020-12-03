import React from "react"
import "../style/CheckoutProduct.scss"
import { ratingStars } from "./Product"
import { useStateValue } from "../../context/StateProvider"

function CheckoutProduct({ id, image, title, price, rating, hideButton }: any) {
  const dispatch = useStateValue()[1]

  const removeFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", id })
  }

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="product" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">{ratingStars(rating)}</div>

        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
