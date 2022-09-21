import { Category, State, Todo } from "./store/types"

let previousState: State | null = null

export function render(state: State): void {
  if (state.selectedCategory !== previousState?.selectedCategory) {
    const catListEl = document.querySelector("#categories ul") as HTMLElement // bad

    catListEl.innerHTML = state.categories
      .map(categoryToHtml(state.selectedCategory))
      .join("\n")
  }

  if (state.username !== previousState?.username) {
    document.title = state.username ? `${state.username}’s Tasks` : `Your Tasks`
  }

  if (state.todos !== previousState?.todos && state.todos.length > 0) {
    const todoListEl = document.getElementById("todoList") as HTMLElement // bad

    todoListEl.innerHTML =
      "<ul>" +
      state.todos.map((todo) => `<h2>${todo.title}</h2>`).join("") +
      "</ul>"
  }

  if (state.selectedCategory !== previousState?.selectedCategory) {
    const catHeaderEl = document.querySelector(
      "#categories header"
    ) as HTMLElement // bad

    catHeaderEl.innerText =
      state.categories.find((cat) => cat.id === state.selectedCategory)?.name ??
      ""
  }

  previousState = state
  console.log("loading removed!")
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
