import { Router } from "express"
import {
  signUp,
  signIn,
  confirm,
  forgotPassword,
  resetPassword,
  validateResetPassword,
} from "../controllers/auth"

const router = Router()

router.post("/signup", signUp)

router.post("/signin", signIn)

router.get("/confirmation/:key", confirm)

router.route("/forgot/:key").get(forgotPassword).post(resetPassword)

router.route("/forgot-validate/:key").get(validateResetPassword)

export default router
