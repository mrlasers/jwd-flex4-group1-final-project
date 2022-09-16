import * as React from 'react'

type Props = {
  lpignore?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = ({ lpignore, ...props }) => {
  return <input {...props} data-lpignore={!!lpignore} />
}
