import { nanoid } from "nanoid"

import { Actions } from "../store/actions"
import { State } from "../store/types"

type Props = {
  document: Document
  dispatch?: (action: Actions) => void
  getState?: () => State
}

export function attachEventListeners({ document, dispatch, getState }: Props) {}
