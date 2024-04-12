import { GetNotes, ReadNote } from 'src/shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
    }
  }
}
