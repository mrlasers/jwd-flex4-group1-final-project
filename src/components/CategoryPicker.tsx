import * as React from 'react'
import {
  VscAdd,
  VscClose,
  VscEdit,
  VscSave,
  VscTrash,
  VscTriangleDown,
} from 'react-icons/vsc'

import {
  CategoryUpdate,
  ReactChangeEventLike,
  TodoCategory,
  UpdateCategory,
} from '../types'
import { Bubble } from './Bubble'
import styles from './CategoryPicker.module.scss'

type Props = {
  title: string
  name: string
  categories: TodoCategory[]
  selected: string
  onSelect?: (category: TodoCategory) => void
  onChange: (e: ReactChangeEventLike) => void
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpdateCategory: (action: CategoryUpdate) => void
}

export const CategoryTiles: React.FC<Props & { showEdit: boolean }> = ({
  showEdit,
  categories,
  selected,
  onChange,
  onUpdateCategory,
  name,
}) => {
  return (
    <>
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
    </>
  )
}

export function cls(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export const CategoryDropdown: React.FC<Props & { showEdit: boolean }> = ({
  title,
  categories,
  name,
  selected,
  showEdit,
  onSelect,
  onChange,
  onUpdateCategory,
}) => {
  const [showOptions, setShowOptions] = React.useState<boolean>(false)
  const [selectedText, setSelectedText] = React.useState<string>()

  React.useEffect(() => {
    const found = categories.find((cat) => cat.id === selected)
    console.log("CategoryDropdown.useEffect()", found)

    if (found) {
      console.log("setting category:", found.name)
      setSelectedText(found.name)
    }
  }, [selected, categories])

  return (
    <div
      className={cls(styles.tile, showOptions && "show", showEdit && "edit")}
    >
      <div className="caption" onClick={() => setShowOptions(!showOptions)}>
        {selectedText} <VscTriangleDown />
      </div>
      <ul>
        {categories.map((cat) => {
          return (
            <li
              key={cat.id}
              onClick={() => {
                setShowOptions(false)
                onChange?.({ currentTarget: { name: name, value: cat.id } })
              }}
            >
              <Bubble filled={cat.id === selected} />
              {cat.name}
            </li>
          )
        })}
      </ul>
      <div className="blanket" onClick={() => setShowOptions(false)}></div>
    </div>
  )
}

export const CategoryPicker: React.FC<Props> = ({
  title,
  categories,
  name,
  selected,
  onSelect,
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

      {categories.length <= 4 ? (
        <CategoryTiles
          categories={categories}
          selected={selected}
          showEdit={showEdit}
          onChange={onChange}
          onSelect={onSelect}
          onUpdateCategory={onUpdateCategory}
          name={name}
          title={title}
        />
      ) : (
        <CategoryDropdown
          categories={categories}
          selected={selected}
          showEdit={showEdit}
          onChange={onChange}
          onSelect={onSelect}
          onUpdateCategory={onUpdateCategory}
          name={name}
          title={title}
        />
      )}
    </fieldset>
  )
}
