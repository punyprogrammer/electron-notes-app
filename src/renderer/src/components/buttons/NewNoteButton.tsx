import { useSetAtom } from 'jotai'
import { ActionButton, ActionButtonProps } from './ActionButtons'
import { LuFileSignature } from 'react-icons/lu'
import { createEmptyNoteAtom } from '../../store/index'
export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createNewNote = useSetAtom(createEmptyNoteAtom)
  const addNewNote = () => {
    createNewNote()
  }
  return (
    <ActionButton onClick={addNewNote} {...props}>
      <LuFileSignature className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
