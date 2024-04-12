import { useSetAtom } from 'jotai'
import { ActionButton, ActionButtonProps } from './ActionButtons'
import { FaRegTrashCan } from 'react-icons/fa6'
import { deleteNoteAtom } from '../../store'
export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)
  const handleDeleteNote = async () => {
    console.info('Handle deletel')
    await deleteNote()
  }
  return (
    <ActionButton onClick={handleDeleteNote} {...props}>
      <FaRegTrashCan className="h-4 w-4 text-zinc-300" />
    </ActionButton>
  )
}
