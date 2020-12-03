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
      const url: string = `${process.env.REACT_APP_API_URL}/auth/signup`
      const response = await axios.post(url, data)
      const res = response.data

      if (res.error) throw new Error(res.error)

      const { user } = res

      dispatch({ type: "SIGNING", user })
      history.push("/")
    } catch ({ message }) {
      setError("Email already assigned to an user")
    }
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
          className="login__logo"
        />
      </Link>

      <div className="login__container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="username" register={register} errors={errors} />

          <Input name="email" register={register} errors={errors} />

          <Input name="password" register={register} errors={errors} />

          <p style={{ color: "red" }}>{error}</p>
          <button className="login__button__login">Register</button>
        </form>

        <p>
          By logging in you agree to the AMAZON FAKE CLONE Conditions of Use
          {" &"} Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <div className="login__register">
          <p className="login__register__question">
            Do you have an Amazon Fake Clone account?
          </p>
          <Link to="/login">
            <button className="login__button__register">Go to Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
