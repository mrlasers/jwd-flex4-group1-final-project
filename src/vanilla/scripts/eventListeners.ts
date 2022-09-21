import { nanoid } from "nanoid"

import { Actions } from "./store/actions"
import { State } from "./store/types"

type Props = {
  document: Document
  dispatch?: (action: Actions) => void
  getState?: () => State
}

export function attachEventListeners({ document, dispatch, getState }: Props) {
  document.addEventListener("focusin", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    if (target instanceof HTMLInputElement) {
      if (target.matches(".overflow")) {
        const selectionStart = Number(
          target.getAttribute("data-selectionStart")
        )
        const selectionEnd = Number(target.getAttribute("data-selectionEnd"))

        target.setSelectionRange(selectionStart, selectionEnd)

        target.removeAttribute("data-selectionStart")
        target.removeAttribute("data-selectionEnd")
      }
    }
  })

  document.addEventListener("focusout", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    if (target instanceof HTMLInputElement) {
      if (target.matches(".overflow")) {
        target.setAttribute(
          "data-selectionStart",
          String(target.selectionStart)
        )
        target.setAttribute("data-selectionEnd", String(target.selectionEnd))

        target.selectionStart = 0
        target.selectionEnd = 0
      }
    }
  })

  document.addEventListener("input", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    if (target instanceof HTMLInputElement) {
      if (target.matches("#username")) {
        dispatch?.({
          type: "UPDATE_USERNAME",
          payload: target.value,
        })
      }

      if (target.matches("#newTodoForm input") && target?.name) {
        if (target.matches(".tilelist input")) {
          event.preventDefault()
          target.closest(".tilelist")?.classList.remove("active")
        }

        dispatch?.({
          type: "UPDATE_FORM",
          payload: {
            name: target.name,
            value: target.value,
          },
        })
      }
    }
  })

  document.addEventListener("submit", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    if (target.matches("#newTodoForm")) {
      event.preventDefault()

      // target.classList.add("validating")

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

  document.addEventListener("click", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    if (target.matches(".tilelist header")) {
      // console.log("matches `.tilelist header")

      event.preventDefault()
      // event.stopPropagation()
      target.closest(".tilelist")?.classList.toggle("active")
    }
  })
}
