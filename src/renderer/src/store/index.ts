import { NoteInfo } from 'src/shared/model'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  // sort them by my recent
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}
// an asynchrounous atom that loads notes from the main process
const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)
export const selectedNoteAtomIndex = atom<number | null>(null)
export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteAtomIndex)
  if (selectedNoteIndex === null || !notes) return null
  const selectedNote = notes[selectedNoteIndex]
  return {
    ...selectedNote,
    content: `Hello from note ${selectedNoteIndex}`
  }
})
export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return
  const title = `Note ${notes?.length + 1}`
  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }
  const newNotes = [newNote, ...notes.filter((item) => item.title !== title)]
  set(notesAtom, newNotes)
  set(selectedNoteAtomIndex, 0)
})
export const deleteNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote || !notes) return
  const newNotes = notes.filter((item) => item.title !== selectedNote?.title)
  set(notesAtom, newNotes)
  set(selectedNoteAtomIndex, null)
})
