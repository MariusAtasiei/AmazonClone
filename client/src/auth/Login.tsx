import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import Input from "./Input"
import axios from "axios"
import "./style/Auth.scss"
import { useStateValue } from "../context/StateProvider"

function Login() {
  const [error, setError] = useState("")
  const { errors, handleSubmit, register } = useForm()
  const dispatch = useStateValue()[1]
  const history = useHistory()

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signin`,
        data
      )
      const res = response.data

      if (res.error) throw new Error(res.error)

      const { user } = res

      dispatch({ type: "SIGNING", user })
      history.push("/")
    } catch ({ message }) {
      setError(message)
    }
  }

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
        <h1>Log in</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="email" register={register} errors={errors} />

          <Input name="password" register={register} errors={errors} />

          <p style={{ color: "red" }}>{error}</p>
          <button className="login__button__login">Log In</button>
        </form>

        <p>
          By logging in you agree to the AMAZON FAKE CLONE Conditions of Use{" "}
          {"&"} Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <div className="login__register">
          <p className="login__register__question">
            Don't you have an Amazon Fake Clone account?
          </p>
          <Link to="/register">
            <button className="login__button__register">Go to Register</button>
          </Link>

          <p className="login__register__question">
            Did you forget the password?
          </p>
          <Link to="/forgot-password">
            <button className="login__button__register">Let's reset it</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
