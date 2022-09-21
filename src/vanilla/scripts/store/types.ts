import { getEmptyFormData } from "./"

export type Todo = {
  id: string
  title: string
  category: string
  duedate: string | null
  done: boolean
  assignedto: string
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
  previouslyAssigned: string[]
  form: {
    invalid: Array<keyof Omit<Todo, "id">>
    data: Omit<Todo, "id">
  }
  nightman: boolean
}

export type ExternalState = Omit<State, "form">

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

export const defaultState: State = {
  username: "",
  todos: [],
  categories: defaultCategories,
  previouslyAssigned: [],
  // llaaaaaaaaaazzzzzyyy
  selectedCategory: defaultCategories[0].id, // bad, but we know it's not empty
  form: {
    invalid: [],
    data: getEmptyFormData(defaultCategories[0].id),
  },
  nightman: false,
}
