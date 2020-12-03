import { Request, Response } from "express"
import User from "../models/user"
import { NativeError } from "mongoose"
import mailer from "nodemailer"

export const signUp = async (req: Request, res: Response) => {
  const { body } = req

  try {
    const user: any = await User.create(body)

    const { _id } = user

    const { username, email } = body

    const token: string = `${_id}&${user.encryptPassword(_id.toString())}`

    const url: string = `${process.env.CLIENT_URL}/confirmation/${token}`

    const transporter = mailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_KEY },
    })

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Amazon Fake Clone | Confirm Account",
      text: `Hello, ${username}! \nPlease confirm your account by clicking the link below: \n${url}`,
    }

    transporter.sendMail(mailOptions, function (err) {
      if (err) throw err
    })

    return res.json({ user: { username, email, _id } })
  } catch ({ message }) {
    return res.json({ error: message })
  }
}

export const signIn = (req: Request, res: Response) => {
  const { email, password } = req.body

  const findUser = User.findOne({ email }).select("-__v  -createdAt -updatedAt")

  findUser.exec((err: NativeError, user: any) => {
    if (err) return res.json({ error: err.message })
    else if (!user) return res.json({ error: "User not found" })
    else if (!user.authenticate(password))
      return res.json({ error: "Email and password don't match" })

    const { username, _id } = user

    return res.json({ user: { username, email, _id } })
  })
}

export const confirm = (req: Request, res: Response) => {
  const [id, token] = req.params.key.split("&")

  const userFind = User.findById(id)

  userFind.exec((err: NativeError, user: any) => {
    if (err) {
      return res.json({ error: "Invalid email" })
    } else if (!user) {
      return res.json({ error: "User not found" })
    } else if (user.confirmed) {
      return res.json({ message: "Account already confirmed" })
    }

    const message: string = user.confirm(token)

    user.save()

    return res.json({ message })
  })
}

// @ts-ignore
export const forgotPassword = (req: Request, res: Response) => {
  const email = req.params.key

  try {
    const findUser = User.findOne({ email })

    findUser.exec((err: NativeError, user: any) => {
      if (err) {
        return res.json({ error: "Invalid email" })
      } else if (!user) {
        return res.json({ error: "User not found" })
      }

      const token: string = `${user._id}&${user.encryptPassword(
        user._id.toString()
      )}`

      const url: string = `${process.env.CLIENT_URL}/reset-password/${token}`

      const transporter = mailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_ID, pass: process.env.GMAIL_KEY },
      })

      const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: "Amazon Fake Clone | Reset Password",
        text: `Hello, ${user.username}! \nTo reset your actual password, please click the link below: \n${url}`,
      }

      transporter.sendMail(mailOptions, function (err) {
        if (err) throw new Error("The email could not be sent")
      })

      return res.json({ message: "Mail sent. Please check your email." })
    })
  } catch ({ message }) {
    return res.json({ error: message })
  }
}

export const resetPassword = (req: Request, res: Response) => {
  const [id, token] = req.params.key.split("&")
  const { password } = req.body

  const findUser = User.findById(id)

  findUser.exec((err: NativeError, user: any) => {
    if (err) return res.json({ message: "Invalid link" })
    else if (!user) return res.json({ message: "Invalid link" })

    const confirm: string = user.confirm(token)

    if (!confirm.includes("successfully"))
      return res.json({ message: "Invalid link" })

    user.password = password

    user.save()

    return res.json({ message: "Password changed successfully" })
  })
}

export const validateResetPassword = (req: Request, res: Response) => {
  const [id, token] = req.params.key.split("&")

  const findUser = User.findById(id)

  findUser.exec((err: NativeError, user: any) => {
    if (err) return res.json(false)
    else if (!user) return res.json(false)

    const confirm: string = user.confirm(token)

    if (!confirm.includes("successfully")) return res.json(false)

    return res.json(true)
  })
}
