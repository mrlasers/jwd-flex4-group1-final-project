import * as React from 'react'

import styles from './TaskList.module.scss'

type OnClickMsg = {
  type: "filter"
  value: string
}

type Props = {
  filters: string[]
  onClick: (msg: OnClickMsg) => void
}

function tap<A>(a: A): A {
  console.log(a)
  return a
}

export const TaskListControls: React.FC<Props> = ({ filters, onClick }) => {
  function unique<A>(val: A, idx: number, arr: A[]): boolean {
    return arr.findIndex((v) => v === val) === idx
  }

  return (
    <nav className={styles.taskListControls}>
      {filters.filter(unique).map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() =>
            onClick({
              type: "filter",
              value: filter,
            })
          }
        >
          {filter}
        </button>
      ))}
    </nav>
  )
}
