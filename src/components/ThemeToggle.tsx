import * as React from 'react'

import { themeToggle } from './ThemeToggle.module.scss'

type Props = {
  value: boolean
  onChange: (isDarkMode: boolean) => void
}

export const ThemeToggle: React.FC<Props> = ({ value, onChange }) => {
  return <button className={themeToggle}>Your code goes here</button>
}
