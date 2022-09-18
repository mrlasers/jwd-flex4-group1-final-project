import i18n from "i18next"
import * as React from "react"
import { Helmet } from "react-helmet-async"
import { initReactI18next, useTranslation } from "react-i18next"

import styles from "./app.module.scss"
import {
  Input,
  LanguageSelector,
  NewTodoForm,
  TaskCardList,
  TaskListControls,
  ThemeToggle,
} from "./components"
import { rootReducer } from "./store"
import { Action, AppState, Todo, TodoCategory, UpdateCategory } from "./types"

function configureI18N(language: string) {
  return i18n.use(initReactI18next).init({
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
          "too narrow message": "too narrow",
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
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
}

const savedState = localStorage.getItem("tasks-app")

const defaultState: AppState = {
  user: {},
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
  view: {
    filter: "all",
  },
  settings: {
    language: "en",
    defaultCategoryId: "work",
  },
}

const initialState: AppState = {
  ...defaultState,
  ...(savedState ? JSON.parse(savedState) : {}),
}

configureI18N(initialState?.settings?.language || "en")

export const App = () => {
  // hooks
  const [username, setUsername] = React.useState<string>("")
  const [darkTheme, setDarkTheme] = React.useState<boolean>(false)
  const [state, dispatch] = React.useReducer<typeof rootReducer>(
    rootReducer,
    initialState
  )

  const filteredTodos = React.useMemo<Todo[]>(
    () =>
      state.todos.filter((todo) => {
        switch (state.view.filter) {
          default:
            return true
          case "incomplete":
            return !todo.done
          case "complete":
            return todo.done
        }
      }),
    [state.todos, state.view.filter]
  )

  React.useEffect(() => {
    localStorage.setItem("tasks-app", JSON.stringify(state))
  }, [state])

  const { t, i18n } = useTranslation()

  // helpers

  function changeLanguage(lang: "en" | "es") {
    i18n.changeLanguage(lang)

    dispatch({ type: "UPDATE_LANGUAGE", payload: lang })
  }

  // magic
  return (
    <>
      <section className={styles.container}>
        <Helmet>
          <title>
            {state.user?.username
              ? `${state.user.username}'s Tasks`
              : "Your Tasks"}
          </title>
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
                { countryCode: "ES", languageCode: "es" },
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
            <Input
              type="text"
              placeholder={t("name here")}
              name="username"
              id="username"
              value={state.user.username || ""}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_USERNAME",
                  payload: e.currentTarget.value,
                })
              }
              lpignore={true}
            />
          </header>

          <NewTodoForm
            categories={state.categories}
            defaultCategoryId={state.settings?.defaultCategoryId}
            onSubmit={(todo) =>
              dispatch({
                type: "ADD_TODO",
                payload: todo,
              })
            }
            onUpdateCategory={dispatch}
          />

          <TaskListControls
            filters={["all", "incomplete", "complete"]}
            onClick={(msg) => {
              switch (msg.type) {
                default:
                  return
                case "filter": {
                  dispatch({
                    type: "SET_FILTER",
                    payload: msg.value,
                  })
                }
              }
            }}
          />
          <TaskCardList
            todos={filteredTodos}
            onChange={(todo) =>
              dispatch({ type: "UPDATE_TODO", payload: todo })
            }
            onDelete={(todo) =>
              dispatch({ type: "DELETE_TODO", payload: todo })
            }
          />
        </main>

        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>

        <footer>
          <div>“Don’t be a narc.” –Tylor Durden</div>
        </footer>
      </section>
      <div className={styles.tooNarrow}>
        {t(`too narrow message`)
          .split("")
          .map((c, idx) => (
            <span key={idx}>{!c.trim() ? "\u00a0" : c}</span>
          ))}
      </div>
    </>
  )
}
