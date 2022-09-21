import { andThen, maybeHtmlElement } from "../helpers"
import { EventProps } from "./"

export function inputListeners({
  document,
  dispatch,
  getState,
}: EventProps): void {
  document.addEventListener("input", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    /* yes, we do it twice so it's clear and easier to adjust later if
       the distinction turns out to matter 👆 */
    if (!(target instanceof HTMLInputElement)) return

    // if (target.matches("#assignedto-input")) {
    //   const shadowText =
    //     getState?.().previouslyAssigned.find((name) =>
    //       name.match(target.value)
    //     ) ?? ""

    //   console.log("look for shadow text", `"${shadowText}"`)

    //   const shadow = document.getElementById("assignedto-shadow")

    //   if (shadow instanceof HTMLInputElement) {
    //     shadow.value = shadowText
    //   }
    // }

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

    if (target.matches("#todoList input[type=checkbox]")) {
      andThen(
        andThen(maybeHtmlElement(target.closest("[data-todo-id]")), (el) =>
          el.getAttribute("data-todo-id")
        ),
        (todoId) =>
          dispatch?.({
            type: "TOGGLE_TODO_DONE",
            payload: todoId,
          })
      )
    }
  })
}
