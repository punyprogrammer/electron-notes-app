import { contextBridge, ipcRenderer } from 'electron'
import { GetNotes, ReadNote, WriteNote } from 'src/shared/types'

if (!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled in the user Window')
}
try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args)
  })
} catch (error) {
  console.log(error)
}
