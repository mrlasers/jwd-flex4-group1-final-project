import { Action, Todo } from "./types"

type Username = string
type TodoId = string

export type Actions =
  | Action<"UPDATE_USERNAME", Username>
  | Action<"ADD_TODO", Todo>
  | Action<"REMOVE_TODO", TodoId>
  | Action<"TOGGLE_TODO_DONE", TodoId>
  | Action<"UPDATE_TODO", Todo>
  | Action<"UPDATE_FORM", { name: string; value: string | null }>
  | Action<
      "SETTINGS",
      "clear_all" | "clear_suggestions" | "clear_todos" | "nightman"
    >
  | Action<"ADD_CATEGORY", string>
