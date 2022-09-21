import { $if, andThen, maybeHtmlElement, maybeInputElement } from "./helpers"
import { Category, State, Todo } from "./store/types"

let previousState: State | null = null

export function render(state: State): void {
  console.log("=== RENDER ===")
  if (state.username !== previousState?.username) {
    document.title = state.username ? `${state.username}’s Tasks` : `Your Tasks`

    const greetingInput = document.querySelector(".greeting input")

    if (greetingInput instanceof HTMLInputElement) {
      greetingInput.value = state.username
    }
  }

  if (state.todos !== previousState?.todos) {
    const todoList = document.getElementById("todoList")

    if (todoList instanceof HTMLElement) {
      todoList.innerHTML = renderTodoList(state.todos)
    }
  }

  if (state.form.data !== previousState?.form.data) {
    console.log("dirty form!")
    const { assignedto } = state.form.data

    const shadowInput = document.getElementById("assignedto-shadow")
    if (shadowInput instanceof HTMLInputElement) {
      const suggestion = assignedto.length
        ? state.previouslyAssigned.find((name) => !!name.match(assignedto)) ??
          ""
        : ""

      console.log("dirty shadow:", assignedto, suggestion, shadowInput.value)

      shadowInput.value = suggestion
    }
  }

  if (state.form.data.duedate !== previousState?.form?.data?.duedate) {
    const dueDateEl = document.querySelector("#duedate")
    const { duedate } = state.form.data

    if (dueDateEl) {
      dueDateEl.innerHTML = renderDueDate(duedate)
    }
  }

  // if(state.categories !== previousState?.categories) {
  //   const catHeader = document.querySelector("#categories header")
  //   const catList = document.querySelector("#categories ul")

  // }

  if (
    state.categories !== previousState?.categories ||
    state.selectedCategory !== previousState?.selectedCategory
  ) {
    console.log("rerendering the category list")
    const catHeader = document.querySelector("#categories header")
    const catList = document.querySelector("#categories ul")

    if (catHeader instanceof HTMLElement && catList instanceof HTMLElement) {
      catHeader.innerText =
        state.categories.find((cat) => cat.id === state.selectedCategory)
          ?.name ?? ""

      catList.innerHTML = state.categories
        .map(categoryToHtml(state.selectedCategory))
        .join("\n")

      if (state.categories.length > 4) {
        catList.classList.add("dropdown")
      } else {
        catList.classList.remove("dropdown")
      }
    }
  }

  previousState = state
  document.body.classList.remove("loading")
}

function categoryToHtml(selectedCategory: string) {
  return (cat: Category): string => {
    // ugly, but eh, lazy
    return `<li>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="${cat.id}"
                  ${cat.id === selectedCategory ? "checked" : ""}
                  required
                />
                <b class="bubble" ></b>
                ${cat.name}
              </label>
            </li>`
  }
}

function renderTodoList(todos: Todo[]): string {
  return (
    "<ul>" +
    todos
      .map(
        (todo) => `
          <li>
            <label data-todo-id=${todo.id}>
              <div>
                <input
                  type="checkbox"
                  name="category"
                  value="${todo.id}"
                  ${todo.done ? "checked" : ""}
                />
                <b class="bubble"></b>
                ${todo.title}
              </div>
              <button type="button" class="deleteTodo">
                <i class="fa fa-trash"></i>
              </button>
            </label>
          </li>`
      )
      .join("\n") +
    "</ul>"
  )
}

function renderDueDate(duedate: string | null) {
  const min = new Date().toISOString().slice(0, 10)

  return duedate === null
    ? `<label>
        <span>Select a due date?</span>
        <input type="date" name="duedate" min="${min}"/>
      </label>`
    : `<label>
      <span>${duedate}</span>
      <input type="date" name="duedate" value="${duedate}" min="${min}"/>
    </label>
    <button type="button">
      <i class="fa fa-close"></i>
    </button>`
}
