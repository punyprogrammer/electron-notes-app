import { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton } from './index'
const ActionButtonRows = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}

export default ActionButtonRows
