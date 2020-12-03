import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import { Link } from "react-router-dom"
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"
import "./style/Header.scss"
import { useStateValue } from "../context/StateProvider"

function Header() {
  const [{ basket, user }, dispatch] = useStateValue()

  const handleClick = (ev: any) => {
    ev.preventDefault()

    if (!user) return

    dispatch({ type: "UNSIGNING" })
    return
  }

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      <div className="header__search">
        <input type="text" className="header__search__input" />
        <SearchIcon className="header__search__icon" />
      </div>

      <div className="header__nav">
        {!user ? (
          <Link to="/login">
            <div className="header__nav__option">
              <span className="header__nav__option__line-one">
                Hello, guest
              </span>

              <span className="header__nav__option__line-two">
                Sign {user ? "out" : "in"}
              </span>
            </div>
          </Link>
        ) : (
          <a href="" onClick={handleClick}>
            <div className="header__nav__option">
              <span className="header__nav__option__line-one">
                Hello, {user.username}
              </span>

              <span className="header__nav__option__line-two">
                Sign {user ? "out" : "in"}
              </span>
            </div>
          </a>
        )}

        <Link to="/orders">
          <div className="header__nav__option">
            <span className="header__nav__option__line-one">Returns</span>

            <span className="header__nav__option__line-two">& Orders</span>
          </div>
        </Link>

        <div className="header__nav__option">
          <span className="header__nav__option__line-one">Your</span>

          <span className="header__nav__option__line-two">Prime</span>
        </div>

        <Link to="/checkout" className="header__basket__link">
          <div className="header__basket">
            <ShoppingBasketIcon />

            <span className="header__nav__option__line-two header__basket__count">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
