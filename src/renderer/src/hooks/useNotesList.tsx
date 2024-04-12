import { NoteInfo } from 'src/shared/model'
import { notesAtom, selectedNoteAtomIndex } from '../store/index'
import { useAtomValue, useAtom } from 'jotai'
type UseNoteListReturnType = {
  notes: NoteInfo[]
  selectedNoteIndex: number | null
  handleOnSelect: (index: number) => () => Promise<void>
}
export const useNotesList = ({ onSelect }: { onSelect?: () => void }): UseNoteListReturnType => {
  const notes = useAtomValue(notesAtom)
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteAtomIndex)
  const handleOnSelect = (index: number) => async () => {
    setSelectedNoteIndex(index)
    if (onSelect) onSelect()
  }
  return {
    notes,
    selectedNoteIndex,
    handleOnSelect
  }
}
