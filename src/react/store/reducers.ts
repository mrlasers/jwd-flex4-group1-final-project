import { nanoid } from 'nanoid'

import { Action, AppState, Todo } from '../types'

export const addTodo = (newTodo: Omit<Todo, "id">): Action => ({
  type: "ADD_TODO",
  payload: { ...newTodo, id: nanoid() },
})

export const rootReducer: React.Reducer<AppState, Action> = (state, action) => {
  console.log("action.type", action.type, JSON.stringify(action.payload))
  switch (action.type) {
    default:
      return state
    case "ADD_CATEGORY": {
      console.log("adding category:", action.payload)
      const newCat = action.payload.trim()
      const newId = nanoid()

      if (state.categories.find((cat) => cat.name === newCat)) {
        return state
      }

      return {
        ...state,
        settings: {
          ...state.settings,
          defaultCategoryId: newId,
        },
        categories: [
          ...state.categories,
          {
            id: newId,
            name: newCat,
          },
        ],
      }
    }
    case "UPDATE_CATEGORY": {
      const { id, name } = action.payload

      return !name.length
        ? state
        : {
            ...state,
            categories: state.categories.map((cat) =>
              cat.id === id ? action.payload : cat
            ),
          }
    }
    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
        settings: {
          ...state.settings,
          defaultCategoryId: action.payload.category,
        },
      }
    }
    case "UPDATE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id !== action.payload.id
            ? todo
            : { ...action.payload, id: todo.id }
        ),
      }
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }
    }
    case "UPDATE_LANGUAGE": {
      return {
        ...state,
        settings: {
          ...state.settings,

          language: action.payload,
        },
      }
    }
    case "UPDATE_USERNAME": {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      }
    }

    case "SET_FILTER": {
      return {
        ...state,
        view: {
          ...state.view,
          filter: action.payload,
        },
      }
    }
  }
}
