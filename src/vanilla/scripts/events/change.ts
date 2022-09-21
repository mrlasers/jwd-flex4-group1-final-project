import { EventProps } from "./"

export function changeListeners({
  document,
  dispatch,
  getState,
}: EventProps): void {
  document.addEventListener("input", (event) => {
    const { target } = event

    /* keep typescript happy with this line */
    if (!(target instanceof HTMLElement)) return
  })
}
