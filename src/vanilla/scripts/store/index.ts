import { nanoid } from "nanoid"

import { Actions } from "./actions"
import { reducer } from "./reducer"
import { Action, State, Todo } from "./types"

type Reducer<S, A> = (state: S, action: A) => S

type SubscriptionFn<S> = (state: S) => void

type Subscriber<S> = {
  id: string
  fn: SubscriptionFn<S>
}

type StoreProps<S, A> = {
  initialState: S
  reducer: (state: S, action: A) => S
}

export function configureStore<S, A>({
  initialState,
  reducer,
}: StoreProps<S, A>) {
  let state = initialState
  let subscribers: Subscriber<S>[] = []

  return {
    dispatch: (action: A) => {
      const nextState = reducer(state, action)

      // console.log("dispatched; rerender?", nextState !== state)
      // console.log(JSON.stringify(state, null, 2))
      // console.log(JSON.stringify(nextState, null, 2))

      if (nextState !== state) {
        state = nextState
        subscribers.forEach(({ fn }) => fn(state))
      }
    },
    subscribe: (fn: SubscriptionFn<S>) => {
      const id = nanoid()

      subscribers.push({ id, fn })

      fn(state)

      return () => {
        subscribers.filter((sub) => sub.id !== id)
      }
    },
    getState: (): S => state,
  }
}

const emptyFormData: Omit<Todo, "id"> = {
  title: "",
  category: "",
  done: false,
  duedate: null,
  assignedto: "",
}

export function getEmptyFormData(categoryId: string): Omit<Todo, "id"> {
  return {
    ...emptyFormData,
    category: categoryId,
  }
}

export function createStore(initialState: State) {
  return configureStore({
    initialState,
    reducer,
  })
}
