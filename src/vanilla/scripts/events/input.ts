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
}
