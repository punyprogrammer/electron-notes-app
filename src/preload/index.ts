import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context Isolation must be enabled in the user Window')
}
try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language
  })
} catch (error) {
  console.log(error)
}
