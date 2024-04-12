import { homedir } from 'os'
import { appDirectoryName, fileEncoding } from '../../shared/constants'
import { ensureDir, readdir, stat, readFile, writeFile, remove } from 'fs-extra'

import { NoteInfo } from '../../shared/model'
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '../../shared/types'
import { dialog } from 'electron'
import path from 'path'

export const getHomeDir = () => {
  return `${homedir()}/${appDirectoryName}`
}
export const getNotes: GetNotes = async () => {
  const rootDir = getHomeDir()
  //   Will create a dir if it doesn't exist
  await ensureDir(rootDir)
  //   Read the notes directory with the fileEncoding and
  const notesFileName = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })
  //   get all file names with .md extension
  const notes = notesFileName.filter((name) => name.endsWith('.md'))
  return Promise.all(notes.map((note) => getNoteInfoFromFilename(note)))
}
// read notes from file system
export const readNote: ReadNote = async (filename: string) => {
  const rootDir = getHomeDir()
  return readFile(`${rootDir}/${filename}.md`, {
    encoding: fileEncoding
  })
}
// A function to get the note content from filename
export const getNoteInfoFromFilename = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getHomeDir()}/${fileName}`)
  return {
    title: fileName.replace('.md', ''),
    lastEditTime: fileStats.mtimeMs
  }
}
// A function to write the note to the filesystem
export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getHomeDir()
  return writeFile(`${rootDir}/${filename}.md`, content, {
    encoding: fileEncoding
  })
}
// A function to create a new note
export const createNote: CreateNote = async () => {
  const rootDir = getHomeDir()
  await ensureDir(rootDir)
  // show the dialog to the user
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Mardown', extensions: ['md'] }]
  })
  if (canceled || !filePath) {
    console.info('User canceled the dialog')
    return false
  }
  const { name: filename, dir: parentDir } = path.parse(filePath)
  // check if the parent directory is the root directory
  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation Failed',
      message: 'You can only create notes in the notes-app directory'
    })
    return false
  }
  // create a new note
  console.info('Creating a new note')
  console.info('filePath:', filePath)
  await writeFile(filePath, '')
  return filename
}
// A funciton to delete a note
export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getHomeDir()
  // take user response
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: 'Are you sure you want to delete this note?',
    buttons: ['Delete', 'Cancel'],
    cancelId: 1,
    defaultId: 1
  })
  // if response is 1, then cancel the operation
  if (response === 1) {
    return false
  }
  // delete the selected note
  await remove(`${rootDir}/${filename}.md`)
  return true
}
