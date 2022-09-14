import * as React from 'react'

import styles from './ThemeToggle.module.scss'

type Props = {
  value: boolean
  onChange: (isDarkMode: boolean) => void
}

export const ThemeToggle: React.FC<Props> = ({ value, onChange }) => {
  return <button className={styles.themeToggle}>Your code goes here</button>
}
