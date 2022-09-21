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

export function andThen<A, B>(somefin: A | undefined | null, fn: (a: A) => B) {
  return typeof somefin === "undefined" || somefin === null ? null : fn(somefin)
}

export function maybeHtmlElement(el: any): HTMLElement | null {
  return el instanceof HTMLElement ? el : null
}

export function maybeInputElement(el: any): HTMLInputElement | null {
  return el instanceof HTMLInputElement ? el : null
}

export function toggleClass(className: string, force?: boolean) {
  return (el: HTMLElement): void => {
    el.classList.toggle(className, force)
  }
}

export function $if<A>(predicate: boolean, fn: () => A): A | null {
  return predicate ? fn() : null
}
