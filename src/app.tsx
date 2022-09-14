import i18n from 'i18next'
import { nanoid } from 'nanoid'
import * as React from 'react'
import Flag from 'react-country-flag'
import { Helmet } from 'react-helmet-async'
import { initReactI18next, useTranslation } from 'react-i18next'
import { VscAdd, VscEdit } from 'react-icons/vsc'

import styles from './app.module.scss'
import { CategoryPicker, CategoryUpdate } from './components/CategoryPicker'
import { LanguageSelector } from './components/LanguageSelector'
import { OverflowInput } from './components/OverflowInput'
import { ThemeToggle } from './components/ThemeToggle'
import { Todo, TodoCategory } from './types'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hello: "Hello",
        "name here": "name here",
        "create a todo": "Create a todo",
        "whats on your todo list": `What's on your todo list?`,
        "e.g.": "e.g.",
        "take a nap": "take a nap",
        "pick a category": "Pick a category",
        work: "work",
        other: "other",
        "todo list": "Todo list",
        "add todo": "Add todo",
      },
    },
    es: {
      translation: {
        hello: "Saludos",
        "name here": "nombre aquí",
        "create a todo": "Crear tarea",
        "whats on your todo list": `Que hay en su lista de tareas?`,
        "e.g.": "p.ej.",
        "take a nap": "tome una siesta",
        "pick a category": "Escoge una categoría",
        work: "trabajo",
        other: "otro",
        "todo list": "Lista de tareas",
        // 'add todo': 'Add todo'
      },
    },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
})

type State = {
  todos: Todo[]
  categories: TodoCategory[]
}

type Action =
  | {
      type: "ADD_TODO"
      payload: Todo
    }
  | CategoryUpdate
  | ReplaceCategories

type ReplaceCategories = {
  type: "REPLACE_CATEGORIES"
  payload: TodoCategory[]
}

const categoryReducer: React.Reducer<TodoCategory[], Action> = (
  state,
  action
) => {
  switch (action.type) {
    default:
      return state
    case "ADD_CATEGORY": {
      const newCat = action.payload.trim()
      if (state.find((cat) => cat.name === newCat)) {
        return state
      }

      return [
        ...state,
        {
          id: nanoid(),
          name: newCat,
        },
      ]
    }
    case "REPLACE_CATEGORIES": {
      console.log("replacing categories with", action.payload)
      return action.payload
    }
  }
}

const stateReducer: React.Reducer<State, Action> = (state, action) => {
  console.log("action.type", action.type, JSON.stringify(action.payload))
  switch (action.type) {
    default:
      return state
    case "ADD_CATEGORY": {
      const newCat = action.payload.trim()
      if (state.categories.find((cat) => cat.name === newCat)) {
        return state
      }

      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: nanoid(),
            name: newCat,
          },
        ],
      }
    }
    case "UPDATE_CATEGORY": {
      const { name, id } = action.payload

      return !name.length
        ? state
        : {
            ...state,
            categories: state.categories.map((cat) =>
              cat.id === id ? { id, name } : cat
            ),
          }
    }
    case "ADD_TODO": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      }
    }
  }
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

type FormData = Omit<Todo, "id">

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

  // React.useEffect(() => {
  //   console.log(JSON.stringify(state.categories, null, 2))
  // }, [state])

  const { t, i18n } = useTranslation()

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

  function changeLanguage(lang: "en" | "es") {
    i18n.changeLanguage(lang)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(formData)

    dispatch({
      type: "ADD_TODO",
      payload: {
        ...formData,
        id: nanoid(),
      },
    })
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{username.length ? `${username}'s Tasks` : "Your Tasks"}</title>
      </Helmet>
      <header className={styles.header}>
        <div style={{ display: "flex", gap: "1em" }}>
          <ThemeToggle value={darkTheme} onChange={setDarkTheme} />
          <LanguageSelector
            selectedLanguage={i18n.language}
            languages={[
              {
                countryCode: "US",
                languageCode: "en",
              },
              { countryCode: "MX", languageCode: "es" },
            ]}
            onChange={changeLanguage}
          />
        </div>

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
          <div className="greeting">{t("hello")}, </div>
          <input
            type="text"
            placeholder={t("name here")}
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            data-lpignore
          />
        </header>
        <form
          id="new-todo-form"
          className={styles.newTodoForm}
          onSubmit={handleSubmit}
        >
          <h3>{t("create a todo")}</h3>
          <label>
            <span className="caption">{t("whats on your todo list")}</span>
            <OverflowInput
              placeholder={t("e.g.") + ", " + t("take a nap")}
              name="title"
              data-lpignore
              required
              onChange={updateFormData}
            />
          </label>

          <CategoryPicker
            title={t("pick a category")}
            categories={state.categories}
            name="category"
            selected={formData.category}
            onChange={updateFormData}
            updateCategories={dispatch}
          />

          <button type="submit">{t("add todo")}</button>
        </form>

        <div>
          {state.todos.map((todo) => (
            <div key={todo.id}>
              {todo.title} ({todo.category})
            </div>
          ))}
        </div>
      </main>

      <pre>
        <code>{JSON.stringify(formData, null, 2)}</code>
      </pre>

      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>

      <footer>
        <div>“Don't be a narc.” –Tylor Durden</div>
      </footer>
    </div>
  )
}
