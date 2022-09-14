export type AppState = {
  todos: Todo[]
  categories: TodoCategory[]
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

export type Action = TodoAction | CategoryUpdate | ReplaceCategories

export type ReplaceCategories = {
  type: "REPLACE_CATEGORIES"
  payload: TodoCategory[]
}
