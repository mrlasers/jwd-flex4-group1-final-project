export type Todo = {
  id: string
  title: string
  category: string
}

export type Action<T extends string, P> = {
  type: T
  payload: P
}

export type Category = {
  id: string
  name: string
}

export type State = {
  username: string
  todos: Todo[]
  categories: Category[]
  selectedCategory: string
  form: {
    invalid: Array<keyof Omit<Todo, "id">>
    data: Omit<Todo, "id">
  }
}

export type ExternalState = Omit<State, "form">
