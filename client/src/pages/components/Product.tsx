import React from "react"
import "../style/Product.scss"
import StarIcon from "@material-ui/icons/Star"
import { useStateValue } from "../../context/StateProvider"

function Product({ id, title, image, price, rating }: any) {
  const dispatch = useStateValue()[1]

  const addToBasket = () => {
    const item = { id, title, image, price, rating }
    const type: String = "ADD_TO_BASKET"

    dispatch({ type, item })
  }

  return (
    <div className="product" key={id}>
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product_rating">{ratingStars(rating)}</div>
      </div>

      <img src={image} alt="product" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export const ratingStars = (rating: number) =>
  countStars(rating).map((_, index) => <StarIcon key={index} />)

const countStars = (num: number, array: number[] = []): number[] =>
  num === 1 ? [1, ...array] : countStars(num - 1, [num, ...array])

export default Product
