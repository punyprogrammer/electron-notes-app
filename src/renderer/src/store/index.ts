import { notesMock } from './mocks'
import { NoteInfo } from 'src/shared/model'
import { atom } from 'jotai'

export const notesAtom = atom<NoteInfo[]>(notesMock)
export const selectedNoteAtomIndex = atom<number | null>(null)
export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteAtomIndex)
  if (selectedNoteIndex === null) return null
  const selectedNote = notes[selectedNoteIndex]
  return {
    ...selectedNote,
    content: `Hello from note ${selectedNoteIndex}`
  }
})
export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const title = `Note ${notes.length + 1}`
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
  if (!selectedNote) return
  const newNotes = notes.filter((item) => item.title !== selectedNote?.title)
  set(notesAtom, newNotes)
  set(selectedNoteAtomIndex, null)
})
