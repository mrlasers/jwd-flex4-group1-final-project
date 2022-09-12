import * as React from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './app.module.scss'

export const App = () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Boop!</title>
      </Helmet>

      <header>
        <h1>React App is Go!</h1>
      </header>

      <main>
        <p>
          Here's the React app. It has hot reloading, which is table stakes, but
          still cool.
        </p>
      </main>

      <footer>“Don't be a narc.” –Tylor Durden</footer>
    </div>
  )
}
