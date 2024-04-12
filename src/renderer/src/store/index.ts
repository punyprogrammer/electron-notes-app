import { NoteContent, NoteInfo } from 'src/shared/model'
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
const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteAtomIndex)
  if (selectedNoteIndex === null || !notes) return null
  const selectedNote = notes[selectedNoteIndex]
  const noteContent = await window.context.readNote(selectedNote.title)
  return {
    ...selectedNote,
    content: noteContent
  }
})
export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev)
// for creating a new note
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) return
  const title = await window.context.createNote()
  if (!title) return
  const newNote: NoteInfo = {
    title,
    lastEditTime: Date.now()
  }
  const newNotes = [newNote, ...notes.filter((item) => item.title !== title)]
  set(notesAtom, newNotes)
  set(selectedNoteAtomIndex, 0)
})
export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote || !notes) return
  const isDeleted = await window.context.deleteNote(selectedNote.title)
  console.info('isDelted', isDeleted)
  if (!isDeleted) return
  const newNotes = notes.filter((item) => item.title !== selectedNote?.title)
  set(notesAtom, newNotes)
  set(selectedNoteAtomIndex, null)
})
// atom for saving atomnote

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  // save on disk
  await window.context.writeNote(selectedNote.title, newContent)

  // update the saved note's last edit time
  set(
    notesAtom,
    notes.map((note) => {
      // this is the note that we want to update
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }

      return note
    })
  )
})
