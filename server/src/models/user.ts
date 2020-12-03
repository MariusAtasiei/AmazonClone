import { model, Schema } from "mongoose"
// @ts-ignore
import uuid from "uuidv1"
import crypto from "crypto"

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    salt: String,
  },
  { timestamps: true }
)

userSchema.virtual("password").set(function (password: string) {
  // @ts-ignore
  this._password = password

  // @ts-ignore
  this.salt = uuid()

  // @ts-ignore
  this.hashedPassword = this.encryptPassword(password)
})

userSchema.methods = {
  encryptPassword: function (password: string) {
    if (!password) return ""

    try {
      return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
    } catch (err) {
      return ""
    }
  },
  authenticate: function (password: string) {
    return this.encryptPassword(password) === this.hashedPassword
  },
  confirm: function (token: string): string {
    if (token !== this.encryptPassword(this._id.toString()))
      return "Invalid link"

    this.confirmed = true
    return "Email confirmed successfully"
  },
}

export default model("User", userSchema)
