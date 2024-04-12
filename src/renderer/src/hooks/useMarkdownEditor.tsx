import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '../store/index'
export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  return selectedNote
}
