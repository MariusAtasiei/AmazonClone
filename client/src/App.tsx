import React from "react"
import "./App.css"
import Header from "./core/Header"
import Home from "./pages/Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Checkout from "./pages/Checkout"
import Login from "./auth/Login"
import Register from "./auth/Register"
import { useStateValue } from "./context/StateProvider"
import Confirmation from "./auth/Confirmation"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import Payment from "./pages/Payment"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Orders from "./pages/Orders"

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY || "")

function App() {
  const { user } = useStateValue()[0]

  return (
    // BEM convention // check
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/reset-password/:key">
            <ResetPassword />
          </Route>
          <Route path="/confirmation/:key">
            <Confirmation />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          {!user && (
            <>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </Router>
  )
}

export default App
