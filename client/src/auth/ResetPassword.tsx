import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import axios from "axios"
import Input from "./Input"
import { useForm } from "react-hook-form"
import "./style/Auth.scss"

function ResetPassword() {
  const { key } = useParams()
  const history = useHistory()
  const [validation, setValidation]: [boolean | null, any] = useState(null)
  const [error, setError] = useState("")

  const { handleSubmit, errors, register } = useForm()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/forgot-validate/${key}`)
      .then(({ data }: any) => setValidation(data))
  }, [])

  const onSubmit = (data: any) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/forgot/${key}`, data)
      .then(() => {
        history.push("/login")
        alert("Password reset successfuly")
      })
      .catch(({ message }: any) => setError(message))
  }

  if (validation === null) return <div></div>

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

        {validation ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name="password" errors={errors} register={register} />

            <p>{error}</p>

            <div className="login__register">
              <button className="login__button__login">Reset Password</button>

              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <button className="login__button__register">
                  Go to Log In
                </button>
              </Link>
            </div>
          </form>
        ) : (
          <>
            <h2 style={{ textAlign: "center" }}>Invalid Link</h2>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <button className="login__button__register">Go to Log In</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default ResetPassword
