import { nanoid } from "nanoid"

import { EventProps } from "./"

export function submitListeners({ document, dispatch, getState }: EventProps) {
  document.addEventListener("submit", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    if (target.matches("#newTodoForm")) {
      event.preventDefault()

      const formData = getState?.().form.data

      if (!formData) {
        throw new Error("This should probably be an impossible state, brud.")
      }

      // clear inputs
      const formInputEls = target.querySelectorAll("input[type=text]")

      formInputEls.forEach((el) => {
        if (el instanceof HTMLInputElement) {
          el.value = ""
        }
      })

      const firstInputEl = target.querySelector(
        "input[type=text]"
      ) as HTMLInputElement

      firstInputEl?.focus()

      dispatch?.({
        type: "ADD_TODO",
        payload: {
          id: nanoid(),
          ...formData,
        },
      })
    }
  })
}
