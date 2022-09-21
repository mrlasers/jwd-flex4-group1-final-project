import { andThen } from "../helpers"
import { EventProps } from "./"

export function clickListeners({
  document,
  dispatch,
  getState,
}: EventProps): void {
  document.addEventListener("click", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return

    if (target.matches(".tilelist header")) {
      event.preventDefault()
      target.closest(".tilelist")?.classList.toggle("active")
    }

    if (target.matches(".deleteTodo[data-todo-id]")) {
      andThen(target.getAttribute("data-todo-id"), (payload) => {
        console.log("deleting id", payload)
        dispatch?.({
          type: "REMOVE_TODO",
          payload,
        })
      })
    }
  })
}
