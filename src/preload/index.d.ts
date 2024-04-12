import { GetNotes } from 'src/shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
    }
  }
}
