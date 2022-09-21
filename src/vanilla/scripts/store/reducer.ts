import { nanoid } from "nanoid"

import { getEmptyFormData } from "./"
import { Actions } from "./actions"
import { defaultState, State } from "./types"

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
          payload.name === "category" && payload.value !== null
            ? payload.value
            : state.selectedCategory,
        form: {
          ...state.form,
          data: {
            ...state.form.data,
            [payload.name]: payload.value,
          },
        },
      }
    case "ADD_TODO": {
      const formdata = state.form.data
      const assignedto = formdata.assignedto.trim()

      const previouslyAssigned =
        assignedto.length && !state.previouslyAssigned.includes(assignedto)
          ? [...state.previouslyAssigned, assignedto]
          : state.previouslyAssigned

      return {
        ...state,
        form: {
          invalid: [],
          data: getEmptyFormData(state.selectedCategory),
        },
        todos: [...state.todos, payload],
        /* i'm kinda over the shorthand syntax everywhere, so i tend to do
           this (👇) for property assignments where the details might get lost */
        previouslyAssigned: previouslyAssigned,
      }
    }
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      }
    case "TOGGLE_TODO_DONE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id !== payload ? todo : { ...todo, done: !todo.done }
        ),
      }
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? payload : todo
        ),
      }

    case "SETTINGS":
      switch (payload) {
        default:
          return state
        case "clear_all":
          return defaultState
        case "clear_suggestions":
          return {
            ...state,
            previouslyAssigned: [],
          }
        case "clear_todos":
          return {
            ...state,
            todos: [],
          }
        case "nightman":
          return {
            ...state,
            nightman: !state.nightman,
          }
      }

    case "ADD_CATEGORY": {
      const name = payload.trim()

      const nextCategories =
        name.length && !state.categories.find((cat) => cat.name === name)
          ? [...state.categories, { id: nanoid(), name: name }]
          : state.categories

      console.log("adding category", name, nextCategories)

      return {
        ...state,
        categories: nextCategories,
      }
    }
  }
}
