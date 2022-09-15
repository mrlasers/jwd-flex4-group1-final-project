import * as React from 'react'
import { VscAdd, VscClose, VscEdit, VscSave, VscTrash } from 'react-icons/vsc'

import { CategoryUpdate, TodoCategory, UpdateCategory } from '../types'
import { Bubble } from './Bubble'
import styles from './CategoryPicker.module.scss'

type Props = {
  title: string
  name?: string
  categories: TodoCategory[]
  selected: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpdateCategory: (action: CategoryUpdate) => void
}

export const CategoryPicker: React.FC<Props> = ({
  title,
  categories,
  name,
  selected,
  onChange,
  onUpdateCategory,
}) => {
  const newCatRef = React.useRef<HTMLInputElement>(null)
  const [selCat, setSelCat] = React.useState<string>(selected)
  const [showEdit, setShowEdit] = React.useState<boolean>(false)
  const [newCategory, setNewCategory] = React.useState<string>("")

  React.useEffect(() => {
    setSelCat(selected)
    // console.log("newCatRef.current", newCatRef.current)
    newCatRef.current?.focus()
  }, [selected, showEdit])

  function handleNewCategory() {
    onUpdateCategory({
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
        <div>
          {!showEdit ? null : (
            <>
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
                <VscAdd />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              setShowEdit(!showEdit)
            }}
          >
            {showEdit ? <VscClose /> : <VscEdit />}
          </button>
        </div>
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
            <Bubble filled={isChecked} />
            {!showEdit ? (
              <span>{category.name}</span>
            ) : (
              <input
                type="text"
                defaultValue={category.name}
                onChange={(e) => {
                  onUpdateCategory({
                    type: "UPDATE_CATEGORY",
                    payload: {
                      ...category,
                      name: e.currentTarget.value,
                    },
                  })
                }}
              />
            )}
          </label>
        )
      })}
    </fieldset>
  )
}
