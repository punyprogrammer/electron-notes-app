import { CreateNote, GetNotes, ReadNote, WriteNote } from 'src/shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
    }
  }
}
