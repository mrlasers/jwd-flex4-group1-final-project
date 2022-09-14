import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './app.module.scss'
import { OverflowInput } from './components/OverflowInput'
import { ThemeToggle } from './components/ThemeToggle'

type State = {
  todos: TODO[]
}

type TODO = {}

type Action = {
  type: "ADD_TODO"
  payload: TODO
}

const stateReducer: React.Reducer<State, Action> = (state, action) => {
  return state
}

const initialState: State = {
  todos: [],
}

export const App = () => {
  const [username, setUsername] = React.useState<string>("")
  const [darkTheme, setDarkTheme] = React.useState<boolean>(false)
  const [state, dispatch] = React.useReducer<typeof stateReducer>(
    stateReducer,
    initialState
  )

  return (
    <>
      <header className={styles.header}>
        <ThemeToggle value={darkTheme} onChange={setDarkTheme} />
      </header>
      <div className={styles.container}>
        <Helmet>
          <title>{username.length ? `${username}'s Tasks` : "Tasks"}</title>
        </Helmet>

        <section className={styles.formGreeting}>
          <div className="greeting">Hello, </div>
          <input
            type="text"
            placeholder="your name here"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            data-lpignore
          />
        </section>

        <main>
          <form id="new-todo-form" className={styles.newTodoForm}>
            <h3>Create a Todo</h3>
            <label>
              <span className="caption">What's on your todo list?</span>
              <OverflowInput
                placeholder="e.g., Take a nap"
                name="title"
                data-lpignore
                required
              />
            </label>

            <fieldset className={styles.radioSet}>
              <legend>Pick a category</legend>
              <label>
                <input type="radio" name="category" value="work" />
                <b />
                <span>Work</span>
              </label>
              <label>
                <input type="radio" name="category" value="other" />
                <b />
                <span>Other</span>
              </label>
            </fieldset>

            <button type="submit">Add todo</button>
          </form>
        </main>

        <footer>“Don't be a narc.” –Tylor Durden</footer>
      </div>
    </>
  )
}
