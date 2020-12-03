import React, { useState } from "react"
import Radium from "radium"
import { Visibility, VisibilityOff } from "@material-ui/icons"

function Input({ name, register, errors }: any) {
  const [visibility, setVisibility] = useState(false)

  const inputStyle = {
    borderColor: errors[name] ? "red" : "",
    ":focus": { outlineColor: errors[name] ? "red" : "" },
  }

  return (
    <div>
      <h5 style={{ color: errors[name] ? "red" : "" }}>
        <span>{name}</span>
        {name === "password" && passwordEye(name, visibility, setVisibility)}
      </h5>
      <input
        type={setType(name, visibility)}
        name={name}
        ref={register({
          required: ` required`,
          minLength: {
            value: 6,
            message: ` must be at least 6 characters`,
          },
          ...setInputErrors(name),
        })}
        style={inputStyle}
      />
      <p>
        {errors[name] ? (
          <>
            <span>{name}</span>
            {errors[name].message}
          </>
        ) : (
          ""
        )}
      </p>
    </div>
  )
}

const setType = (type: string, visibility: boolean) =>
  type === "password" ? (visibility ? "text" : "password") : type

const setInputErrors = (name: string): object =>
  name === "email"
    ? {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: " invalid",
        },
      }
    : {
        maxLength: {
          value: 24,
          message: ` must have maximum 24 characters`,
        },
      }

const passwordEye = (name: string, visibility: boolean, setVisibility: any) => {
  const handleClick = (ev: any) => {
    ev.preventDefault()
    setVisibility(!visibility)
  }

  return name === "password" ? (
    visibility ? (
      <VisibilityOff fontSize="small" onClick={handleClick} />
    ) : (
      <Visibility fontSize="small" onClick={handleClick} />
    )
  ) : null
}

export default Radium(Input)
