import * as React from 'react'

import styles from '../styles/components.module.scss'

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">

export const OverflowInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, onBlur, onFocus, ...props }, parentRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [selection, setSelection] = React.useState<{
      start: number | null
      end: number | null
    }>({ start: 0, end: 0 })

    React.useImperativeHandle(parentRef, () => inputRef.current!, [inputRef])

    return (
      <input
        type="text"
        className={
          !!className
            ? className + " " + styles.overflowInput
            : styles.overflowInput
        }
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={inputRef}
        {...props}
        data-lpignore={true}
      />
    )

    function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
      const { selectionStart, selectionEnd } = e.currentTarget
      setSelection({ start: selectionStart, end: selectionEnd })
      inputRef.current?.setSelectionRange(0, 0)

      return onBlur?.(e)
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
      inputRef.current?.setSelectionRange(selection.start, selection.end)

      return onFocus?.(e)
    }
  }
)
