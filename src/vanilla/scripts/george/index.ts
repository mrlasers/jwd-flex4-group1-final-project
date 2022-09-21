import { tryCatch } from "../helpers"
import { getEmptyFormData } from "../store"
import {
  Category,
  defaultState,
  ExternalState,
  State,
  Todo,
} from "../store/types"

const storageKey = "saved-todo-state"
export function loadState(): State {
  const json = localStorage.getItem(storageKey)

  if (json === null) return defaultState

  const { result, error } = tryCatch(() => JSON.parse(json))

  if (result) {
    return {
      ...defaultState,
      ...result,
    }
    // return result as State // dangerous, very bad, use a decoder for type
  } else {
    return defaultState
  }
}

export function saveState({
  username,
  todos,
  categories,
  selectedCategory,
  previouslyAssigned,
  nightman,
  ...rest
}: State): void {
  // this is lazy, and not in the fun way, just the lazy way
  const toSave: ExternalState = {
    username,
    todos,
    categories,
    selectedCategory,
    previouslyAssigned,
    nightman,
  }

  localStorage.setItem(storageKey, JSON.stringify(toSave))
}
