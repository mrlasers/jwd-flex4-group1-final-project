export type AppState = {
  todos: Todo[]
  categories: TodoCategory[]
  user: {
    username?: string
  }
  view: {
    filter: "all" | "incomplete" | "complete"
  }
  settings: {
    language: string
    defaultCategoryId: string
  }
}

export type TodoCategory = {
  id: string
  name: string
}

export type Todo = {
  id: string
  title: string
  category: string
  done: boolean
  duedate: number
}

export type AddCategory = {
  type: "ADD_CATEGORY"
  payload: string
}

export type UpdateCategory = {
  type: "UPDATE_CATEGORY"
  payload: TodoCategory
}

export type CategoryUpdate = AddCategory | UpdateCategory

export type TodoAction = {
  type: "ADD_TODO" | "UPDATE_TODO" | "DELETE_TODO"
  payload: Todo
}

type UpdateUser = {
  type: "UPDATE_USERNAME"
  payload: string
}

type UpdateSettings = {
  type: "UPDATE_LANGUAGE"
  payload: string
}

type Msg<T extends string, P> = { type: T; payload: P }

export type Action =
  | TodoAction
  | CategoryUpdate
  | ReplaceCategories
  | UpdateSettings
  | UpdateUser
  | Msg<"SET_FILTER", string>

export type ReplaceCategories = {
  type: "REPLACE_CATEGORIES"
  payload: TodoCategory[]
}

export type ReactChangeEventLike = {
  currentTarget: {
    name: string
    value: string
  }
}
