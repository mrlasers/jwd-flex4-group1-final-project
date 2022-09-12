import * as React from 'react'

import styles from './app.module.scss'

export const App = () => {
  return (
    <div className={styles.container}>
      <h1>React App is Go!</h1>
      <div>
        <p>
          Here's the React app. It has hot reloading, which is table stakes, but
          still cool.
        </p>
      </div>
    </div>
  )
}
