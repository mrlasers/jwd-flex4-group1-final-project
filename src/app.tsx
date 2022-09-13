import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './app.module.scss'
import { OverflowInput } from './components/OverflowInput'

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
            <OverflowInput
              placeholder="e.g., Take a nap"
              name="title"
              data-lpignore
            />
          </label>

          <fieldset className={styles.radioSet}>
            <legend>Pick a category</legend>
            <label>
              <input type="radio" name="category" value="work" />
              <b></b>
              <span>Work</span>
            </label>
            <label>
              <input type="radio" name="category" value="other" />
              <b></b>
              <span>Other</span>
            </label>
          </fieldset>

          <button type="submit">Add todo</button>
        </form>
      </main>

      <footer>“Don't be a narc.” –Tylor Durden</footer>
    </div>
  )
}
