import React from "react"
import "./style/Auth.scss"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import Input from "./Input"
import axios from "axios"

function ForgotPassword() {
  const { handleSubmit, errors, register } = useForm()
  const history = useHistory()

  const onSubmit = ({ email }: any) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/forgot/${email}`)
      .then(() => {
        history.push("/")
        alert("Email sent successfully")
      })
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
        <h1>Forgot Password</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="email" errors={errors} register={register} />

          <div className="login__register">
            <button className="login__button__login">Submit</button>

            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <button className="login__button__register">Go to home</button>
            </Link>
          </div>
        </form>
        <p style={{ padding: "0 5px" }}>
          Introduce your email address and we will send you the reset link
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
