import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams, Link } from "react-router-dom"
import "./style/Auth.scss"
import { useStateValue } from "../context/StateProvider"

function Confirmation() {
  const [validation, setValidation] = useState("")
  const { key } = useParams()
  const { user } = useStateValue()[0]

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/confirmation/${key}`)
      .then(({ data }) => setValidation(data.message))
  }, [])

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
          className="login__logo"
        />
      </Link>

      <div className="login__container">
        <h1>Confirmation</h1>

        <p style={{ fontSize: 16, marginBottom: 10 }}>{validation}</p>

        <div className="login__register">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <button className="login__button__login">Go to home</button>
          </Link>
        </div>

        {!user && (
          <div className="login__register">
            <Link to="/login">
              <button className="login__button__register">Go to Log In</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Confirmation
