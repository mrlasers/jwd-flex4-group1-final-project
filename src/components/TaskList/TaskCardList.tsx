import * as React from 'react'
import { VscTrash } from 'react-icons/vsc'

import { Todo } from '../../types'
import { Bubble } from '../Bubble'
import styles from './TaskList.module.scss'

type CardProps = {
  // key?: React.Key | null | undefined
  todo: Todo
  onChange: (todo: Todo) => void
  onDelete: (todo: Todo) => void
}

type ListProps = {
  todos: Todo[]
  onChange: (todo: Todo) => void
  onDelete: (todo: Todo) => void
}

export const TaskCard: React.FC<CardProps> = ({ todo, onChange, onDelete }) => {
  return (
    <li
      onClick={(e) => {
        e.preventDefault()
        onChange({ ...todo, done: !todo.done })
      }}
    >
      <div>
        <Bubble filled={todo.done} />
        <div className="title">{todo.title}</div>
        <button type="button" onClick={() => onDelete(todo)}>
          <VscTrash />
        </button>
      </div>
      <hr />
    </li>
  )
}

export const TaskCardList: React.FC<ListProps> = ({
  todos,
  onChange,
  onDelete,
}) => {
  return (
    <ul className={styles.taskCardList}>
      {todos.map((todo) => (
        <TaskCard
          key={todo.id}
          todo={todo}
          onChange={onChange}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
