export function tryCatch<A>(
  lazy: () => A
): { result: A; error: null } | { result: null; error: string } {
  try {
    return {
      result: lazy(),
      error: null,
    }
  } catch (error) {
    return {
      result: null,
      error: String(error),
    }
  }
}

export function andThen<A>(somefin: A | undefined | null, fn: (a: A) => any) {
  return typeof somefin === "undefined" || somefin === null ? null : fn(somefin)
}
