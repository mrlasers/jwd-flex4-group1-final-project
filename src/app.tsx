import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './app.module.scss'

export const App = () => {
  const [username, setUsername] = React.useState<string>("")

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Boop!</title>
      </Helmet>

      <header className={styles.header}>
        <div className="greeting">Hello, </div>
        <input
          type="text"
          placeholder="our name here"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          data-lpignore
        />
      </header>

      <main>
        <form id="new-todo-form" className={styles.newTodoForm}>
          <h3>Create a Todo</h3>
          <label>
            <span className="caption">What's on your todo list?</span>
            <input
              type="text"
              placeholder="e.g., Take a nap"
              name="title"
              data-lpignore
            />
          </label>

          {/* <fieldset className="tile">
            <label>
              <input type="radio" name="category" value="work" />
              <span className="bubble">Work</span>
            </label>
          </fieldset> */}

          {/* <button type="submit">Add todo</button> */}
        </form>
      </main>

      <footer>“Don't be a narc.” –Tylor Durden</footer>
    </div>
  )
}
