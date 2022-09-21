import { $if, andThen, maybeHtmlElement, toggleClass } from "../helpers"
import { EventProps } from "./"

export function clickListeners({
  document,
  dispatch,
  getState,
}: EventProps): void {
  document.addEventListener("click", (event) => {
    const { target } = event

    if (!(target instanceof HTMLElement)) return

    if (target.matches("#duedate button")) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (target.matches(".tilelist header")) {
      event.preventDefault()

      console.log("toggling active class")
      return target.closest(".tilelist")?.classList.toggle("active")
    }

    if (target.matches("#settings li")) {
      const op = target.getAttribute("data-settings")
      console.log("what is our op?", op)

      target.closest(".tilelist")?.classList.toggle("active")

      switch (op) {
        default:
          target.closest(".tilelist")?.classList.toggle("active")
          return
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
            dispatch?.({
              type: "ADD_CATEGORY",
              payload: res,
            })
          }
        }
        case "nightman": {
          dispatch?.({
            type: "SETTINGS",
            payload: "nightman",
          })
        }
      }
    }

    // if (target.matches(".tilelist *")) {
    //   console.log("tilelist child", target)
    //   return target.closest(".tilelist")?.classList.toggle("active")
    // }

    if (target.matches(".deleteTodo")) {
      const todoIdElement = target.closest("[data-todo-id]")
      if (todoIdElement instanceof HTMLElement) {
        const todoId = todoIdElement.getAttribute("data-todo-id")

        if (todoId) {
          dispatch?.({
            type: "REMOVE_TODO",
            payload: todoId,
          })
        }
      }
    }

    if (target.matches("#duedate button")) {
      dispatch?.({
        type: "UPDATE_FORM",
        payload: {
          name: "duedate",
          value: null,
        },
      })
    }
  })
}
