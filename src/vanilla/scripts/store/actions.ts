import { Action, Todo } from "./types"

export type Actions =
  | Action<"UPDATE_USERNAME", string>
  | Action<"ADD_TODO", Todo>
  | Action<"REMOVE_TODO", Todo>
  | Action<"UPDATE_TODO", Todo>
  | Action<"UPDATE_FORM", { name: string; value: string }>
