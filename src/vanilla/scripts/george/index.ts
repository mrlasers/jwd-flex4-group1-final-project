import { tryCatch } from "../helpers"
import { getEmptyFormData } from "../store"
import { Category, ExternalState, State, Todo } from "../store/types"

const storageKey = "saved-todo-state"

const defaultCategories: Category[] = [
  {
    id: "work",
    name: "Work",
  },
  {
    id: "fun",
    name: "Fun",
  },
]

const defaultState: State = {
  username: "",
  todos: [],
  categories: defaultCategories,
  // llaaaaaaaaaazzzzzyyy
  selectedCategory: defaultCategories[0].id, // bad, but we know it's not empty
  form: {
    invalid: [],
    data: getEmptyFormData(defaultCategories[0].id),
  },
}

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
  ...rest
}: State): void {
  // this is lazy, and not in the fun way, just the lazy way
  const toSave: ExternalState = {
    username,
    todos,
    categories,
    selectedCategory,
  }

  localStorage.setItem(storageKey, JSON.stringify(toSave))
}
