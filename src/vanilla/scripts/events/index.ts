import { Actions } from "../store/actions"
import { State } from "../store/types"
import { changeListeners } from "./change"
import { clickListeners } from "./click"
import { focusListeners } from "./focus"
import { inputListeners } from "./input"
import { keydownListeners } from "./keydown"
import { submitListeners } from "./submit"

export type EventProps = {
  document: Document
  dispatch?: (action: Actions) => void
  getState?: () => State
}

export function attachEventListeners(props: EventProps) {
  clickListeners(props)
  focusListeners(props)
  inputListeners(props)
  submitListeners(props)
  changeListeners(props)
  keydownListeners(props)
}
