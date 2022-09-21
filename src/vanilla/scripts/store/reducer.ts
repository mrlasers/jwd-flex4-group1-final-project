import { getEmptyFormData } from "./"
import { Actions } from "./actions"
import { State } from "./types"

export function reducer(state: State, { type, payload }: Actions): State {
  switch (type) {
    default:
      return state
    case "UPDATE_USERNAME":
      return {
        ...state,
        username: payload,
      }
    case "UPDATE_FORM":
      return {
        ...state,
        selectedCategory:
          payload.name === "category" ? payload.value : state.selectedCategory,
        form: {
          ...state.form,
          data: {
            ...state.form.data,
            [payload.name]: payload.value,
          },
        },
      }
    case "ADD_TODO":
      return {
        ...state,
        form: {
          invalid: [],
          data: getEmptyFormData(state.selectedCategory),
        },
        todos: [...state.todos, payload],
      }
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      }
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? payload : todo
        ),
      }
  }
}
