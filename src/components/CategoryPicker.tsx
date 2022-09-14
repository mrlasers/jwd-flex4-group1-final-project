import * as React from 'react'
import { VscAdd, VscClose, VscEdit, VscSave, VscTrash } from 'react-icons/vsc'

import styles from '../styles/components.module.scss'
import { TodoCategory } from '../types'

type AddCategory = {
  type: "ADD_CATEGORY"
  payload: string
}

export type CategoryUpdate = AddCategory

// type CategoryUpdate = {
//   type:
//     | "ADD_CATEGORY"
//     | "DELETE_CATEGORY"
//     | "UPDATE_CATEGORY"
//     | "SELECT_CATEGORY"
//   category: TodoCategory
// }

type Props = {
  title: string
  name?: string
  categories: TodoCategory[]
  selected: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateCategories: (action: CategoryUpdate) => void
}

export const CategoryPicker: React.FC<Props> = ({
  title,
  categories,
  name,
  selected,
  onChange,
  updateCategories,
}) => {
  const newCatRef = React.useRef<HTMLInputElement>(null)
  const [selCat, setSelCat] = React.useState<string>(selected)
  const [showEdit, setShowEdit] = React.useState<boolean>(false)
  const [newCategory, setNewCategory] = React.useState<string>("")

  React.useEffect(() => {
    setSelCat(selected)
    // console.log("newCatRef.current", newCatRef.current)
    newCatRef.current?.focus()
  }, [selected, showEdit, selCat])

  function handleNewCategory() {
    updateCategories({
      type: "ADD_CATEGORY",
      payload: newCategory,
    })

    setNewCategory("")
    setShowEdit(false)
  }

  return (
    <fieldset className={styles.radioSet + (showEdit ? " edit" : "")}>
      <legend className={styles.addCategory}>
        {title}
        {!showEdit ? null : (
          <div>
            <input
              type="text"
              placeholder="Next category name"
              ref={newCatRef}
              onKeyDown={(e) => {
                if (e.key.toLowerCase() === "enter") {
                  e.preventDefault()
                  handleNewCategory()
                }
              }}
              onChange={(e) => {
                setNewCategory(e.currentTarget.value)
              }}
            />
            <button
              type="button"
              className="default"
              onClick={handleNewCategory}
            >
              <VscSave />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setShowEdit(!showEdit)
          }}
        >
          {showEdit ? <VscClose /> : <VscEdit />}
        </button>
      </legend>
      {categories.map((category) => {
        const isChecked = selected === category.id
        return (
          <label key={category.id}>
            <input
              type="radio"
              name={name}
              value={category.id}
              onChange={onChange}
              checked={category.id === selected}
            />
            <b />
            <span>{category.name}</span>
          </label>
        )
      })}
    </fieldset>
  )
}
