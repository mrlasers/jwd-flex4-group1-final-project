import * as React from 'react'

import { css } from '@emotion/css'

import styles from '../styles/components.module.scss'

type Props = {
  filled: boolean
  color?: string
}

export const Bubble: React.FC<Props> = ({ filled, color }) => {
  const classes = [
    styles.bubble,
    color &&
      css`
        --bubble-color: ${!!color.match(/^\-\-/) ? `var(${color})` : color};
      `,
  ]
    .filter(Boolean)
    .join(" ")
  return <b className={classes} data-filled={filled} />
}
