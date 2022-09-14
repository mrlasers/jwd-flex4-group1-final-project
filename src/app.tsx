import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { VscAdd, VscEdit } from 'react-icons/vsc'

import styles from './app.module.scss'
import { OverflowInput } from './components/OverflowInput'
import { ThemeToggle } from './components/ThemeToggle'

type State = {
  todos: TODO[]
  categories: TodoCategory[]
}

type TODO = {}

type TodoCategory = {
  id: string
  name: string
}

type Action = {
  type: "ADD_TODO"
  payload: TODO
}

const stateReducer: React.Reducer<State, Action> = (state, action) => {
  return state
}

const initialState: State = {
  todos: [],
  categories: [
    {
      id: "work",
      name: "Work",
    },
    {
      id: "fun",
      name: "Fun",
    },
    {
      id: "other",
      name: "Other",
    },
  ],
}

type FormData = {
  title: string
  category: string
}

const emptyFormData: FormData = {
  title: "",
  category: "other",
}

export const App = () => {
  const [username, setUsername] = React.useState<string>("")
  const [darkTheme, setDarkTheme] = React.useState<boolean>(false)
  const [state, dispatch] = React.useReducer<typeof stateReducer>(
    stateReducer,
    initialState
  )

  const [formData, setFormData] = React.useState<FormData>(emptyFormData)

  function updateFormData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget

    if (!name) {
      throw new Error(`You need to set a name on form elements, brud!`)
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{username.length ? `${username}'s Tasks` : "Your Tasks"}</title>
      </Helmet>
      <header className={styles.header}>
        <ThemeToggle value={darkTheme} onChange={setDarkTheme} />

        <nav>
          <a
            href="https://github.com/mrlasers/jwd-flex4-group1-final-project"
            target="_blank"
          >
            View on Github
          </a>
        </nav>
      </header>

      <main>
        <header className={styles.formGreeting}>
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
        </header>
        <form id="new-todo-form" className={styles.newTodoForm}>
          <h3>Create a Todo</h3>
          <label>
            <span className="caption">What's on your todo list?</span>
            <OverflowInput
              placeholder="e.g., Take a nap"
              name="title"
              data-lpignore
              required
              onChange={updateFormData}
            />
          </label>

          <fieldset className={styles.radioSet}>
            <legend>
              Pick a category
              <button type="button">
                <VscEdit />
              </button>
            </legend>
            {state.categories.map((category) => {
              return (
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    onChange={updateFormData}
                    checked={category.id === formData.category}
                  />
                  <b />
                  <span>{category.name}</span>
                </label>
              )
            })}
            {/* <label>
              <input
                type="radio"
                name="category"
                value="work"
                onChange={updateFormData}
              />
              <b />
              <span>Work</span>
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="other"
                onChange={updateFormData}
              />
              <b />
              <span>Other</span>
            </label> */}
          </fieldset>

          <button type="submit">Add todo</button>
        </form>
      </main>

      <pre>
        <code>{JSON.stringify(formData, null, 2)}</code>
      </pre>

      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>

      <footer>“Don't be a narc.” –Tylor Durden</footer>
    </div>
  )
}
