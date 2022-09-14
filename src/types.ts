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

export type Action =
  | {
      type: "ADD_TODO"
      payload: Todo
    }
  | CategoryUpdate
  | ReplaceCategories

export type ReplaceCategories = {
  type: "REPLACE_CATEGORIES"
  payload: TodoCategory[]
}
