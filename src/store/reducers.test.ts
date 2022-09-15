import { AppState } from '../types'
import { rootReducer } from './reducers'

const initialState: AppState = {
  categories: [{ name: "work", id: "work" }],
  settings: {
    language: "en",
    defaultCategoryId: "",
  },
  todos: [
    {
      id: "bigtodo",
      category: "work",
      done: false,
      title: "Big day!",
    },
  ],
  user: {},
}

it(`adds a category`, () => {
  const result = rootReducer(initialState, {
    type: "ADD_CATEGORY",
    payload: "Make dinner",
  })

  expect(result.categories).toMatchObject([
    { name: "work", id: "work" },
    { name: "Make dinner" },
  ])
})

it(`updates a category`, () => {
  expect(
    rootReducer(initialState, {
      type: "UPDATE_CATEGORY",
      payload: { name: "work harder", id: "work" },
    }).categories
  ).toMatchObject([{ name: "work harder", id: "work" }])
})

it(`does not update any categories if id is not matched`, () => {
  expect(
    rootReducer(initialState, {
      type: "UPDATE_CATEGORY",
      payload: { name: "work harder", id: "fun" },
    }).categories
  ).toMatchObject([{ name: "work", id: "work" }])
})
