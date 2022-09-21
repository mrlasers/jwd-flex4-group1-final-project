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
      target.closest(".tilelist")?.classList.toggle("active")
    }

    if (target.matches("#settings li")) {
      const op = target.getAttribute("data-settings")

      target.closest(".tilelist")?.classList.toggle("active")

      switch (op) {
        default:
          return
        case "clear-suggestions":
          return dispatch?.({
            type: "CLEAR_SETTINGS",
            payload: "suggestions",
          })
        case "clear-todos":
          return dispatch?.({
            type: "CLEAR_SETTINGS",
            payload: "todos",
          })
        case "clear-all":
          return dispatch?.({
            type: "CLEAR_SETTINGS",
            payload: "all",
          })
        case "add-category": {
          const res = prompt("Enter new category name")

          if (typeof res === "string" && res.length) {
            dispatch?.({
              type: "ADD_CATEGORY",
              payload: res,
            })
          }
          // const modal = document.querySelector("#modal")
          // if (modal instanceof HTMLDialogElement) {
          //   modal.innerHTML = `<h3>Add category</h3><button onclick="${() =>
          //     console.log("buttholes")}">Buttholes</button>`
          //   modal.showModal()
          // }
        }
      }
    }

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
