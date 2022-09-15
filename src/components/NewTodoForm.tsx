import { nanoid } from 'nanoid'
import * as React from 'react'
import { TFunction, useTranslation } from 'react-i18next'

import { CategoryUpdate, Todo, TodoCategory } from '../types'
import { CategoryPicker, OverflowInput } from './'
import styles from './NewTodoForm.module.scss'

type Props = {
  onSubmit: (todo: Todo) => void
  onUpdateCategory: (update: CategoryUpdate) => void
  categories: TodoCategory[]
  defaultCategoryId?: string
  // t?: TFunction<"translation", undefined>
}

type FormData = Omit<Todo, "id">

const emptyFormData: FormData = {
  title: "",
  category: "other",
  done: false,
}

function makeEmptyFormData(
  categoryId: string,
  categories: TodoCategory[]
): FormData {
  if (!categories.length) {
    throw new Error(
      `makeEmptyFormData(): must include at least one category in categories array`
    )
  }

  const cats = categories.find((cat) => cat.id === categoryId)

  return {
    ...emptyFormData,
    category: cats?.id ?? categories[0].id,
  }
}

export const NewTodoForm: React.FC<Props> = ({
  onSubmit,
  onUpdateCategory,
  categories,
  defaultCategoryId,
}) => {
  const [formData, setFormData] = React.useState<FormData>(
    makeEmptyFormData(defaultCategoryId || "", categories)
  )
  const { t } = useTranslation()
  const titleRef = React.useRef<HTMLInputElement>(null)

  function updateFormData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget

    if (!name) {
      throw new Error(`You need to set a name on form elements, brud!`)
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log(formData)

    onSubmit({
      ...formData,
      id: nanoid(),
    })

    console.log("setFormData(emptyFormData)")
    setFormData(makeEmptyFormData(formData.category, categories))
    titleRef.current?.focus()
  }

  return (
    <form
      id="new-todo-form"
      className={styles.newTodoForm}
      onSubmit={handleSubmit}
    >
      <h3>{t("create a todo")}</h3>
      <label className={styles.formInput}>
        <span className="caption">{t("whats on your todo list")}</span>
        <OverflowInput
          placeholder={t("e.g.") + ", " + t("take a nap")}
          name="title"
          data-lpignore
          required
          value={formData.title}
          onChange={updateFormData}
          ref={titleRef}
        />
      </label>

      <CategoryPicker
        title={t("pick a category")}
        categories={categories}
        name="category"
        selected={formData.category}
        onChange={updateFormData}
        onUpdateCategory={onUpdateCategory}
      />

      <button type="submit">{t("add todo")}</button>
    </form>
  )
}
