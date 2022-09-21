import { EventProps } from "./"

export function focusListeners({
  document,
  dispatch,
  getState,
}: EventProps): void {
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
}
