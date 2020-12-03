const getLocalBasket = () => {
  const basket: string | null = localStorage.getItem("basket")

  return basket ? JSON.parse(basket) : []
}

const getLocalUser = () => {
  const user: string | null = localStorage.getItem("user")

  return user ? JSON.parse(user) : null
}

export const initialState = { basket: getLocalBasket(), user: getLocalUser() }

export const reducer = (state: any, action: any) => {
  const { type } = action
  const { basket } = state

  switch (type) {
    case "ADD_TO_BASKET":
      const newBasket = [...basket, action.item]

      localStorage.setItem("basket", JSON.stringify(newBasket))

      return {
        ...state,
        basket: newBasket,
      }

    case "REMOVE_FROM_BASKET":
      const index = basket.findIndex(({ id }: any) => id === action.id)

      let updateBasket = [...basket]

      if (index >= 0) {
        updateBasket.splice(index, 1)
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in basket!`
        )
      }

      localStorage.setItem("basket", JSON.stringify(updateBasket))

      return { ...state, basket: updateBasket }

    case "EMPTY_BASKET":
      const emptyBasket: any[] = []

      localStorage.removeItem("basket")

      return { ...state, basket: emptyBasket }

    case "SIGNING":
      const { user } = action

      localStorage.setItem("user", JSON.stringify(user))

      return { ...state, user }

    case "UNSIGNING":
      localStorage.removeItem("user")

      return { ...state, user: null }

    default:
      return state
  }
}
