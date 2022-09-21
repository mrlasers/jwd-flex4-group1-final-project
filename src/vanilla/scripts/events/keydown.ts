import { EventProps } from "./"

export function keydownListeners({
  document,
  dispatch,
  getState,
}: EventProps): void {
  document.addEventListener("keydown", (event) => {
    const { target } = event

    if (!(target instanceof HTMLInputElement)) return

    if (target.matches("#assignedto-input")) {
      switch (event.key.toLowerCase()) {
        default:
          break
        case "tab": {
          const shadow = document.getElementById("assignedto-shadow")

          if (shadow instanceof HTMLInputElement && shadow.value.length) {
            event.preventDefault()
            target.value = shadow.value
          }

          return
        }
      }
    }
  })
}
