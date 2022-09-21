import { $if, andThen, maybeHtmlElement, toggleClass } from "../helpers"
import { EventProps } from "./"

export function clickListeners({
  document,
  dispatch,
  getState,
}: EventProps): void {
  document.addEventListener("click", (event) => {
    const { target } = event
    console.log("click!", target)

    if (!(target instanceof HTMLElement)) return

    if (target.matches(".deleteTodo")) {
      const todoIdElement = target.closest("[data-todo-id]")
      if (todoIdElement instanceof HTMLElement) {
        const todoId = todoIdElement.getAttribute("data-todo-id")

        if (todoId) {
          return dispatch?.({
            type: "REMOVE_TODO",
            payload: todoId,
          })
        }
      }

      return
    }

    if (target.matches(".tilelist header")) {
      console.log("tilelist header")
      event.preventDefault()

      return target.closest(".tilelist")?.classList.toggle("active")
    }

    if (target.matches("[data-settings]")) {
      console.log("[data-settings]")
      const op = target.getAttribute("data-settings")

      target.closest(".tilelist")?.classList.toggle("active")

      switch (op) {
        default:
          target.closest(".tilelist")?.classList.toggle("active")
          return null
        case "clear-suggestions":
          return dispatch?.({
            type: "SETTINGS",
            payload: "clear_suggestions",
          })
        case "clear-todos":
          return dispatch?.({
            type: "SETTINGS",
            payload: "clear_todos",
          })
        case "clear-all":
          return dispatch?.({
            type: "SETTINGS",
            payload: "clear_all",
          })
        case "add-category": {
          const res = prompt("Enter new category name")

          if (typeof res === "string" && res.length) {
            return dispatch?.({
              type: "ADD_CATEGORY",
              payload: res,
            })
          }
        }
        case "nightman": {
          return
        }
      }
    }

    if (target.matches(".tilelist *")) {
      return target.closest(".tilelist")?.classList.toggle("active")
    }

    if (target.matches("#duedate button")) {
      return dispatch?.({
        type: "UPDATE_FORM",
        payload: {
          name: "duedate",
          value: null,
        },
      })
    }
  })
}
