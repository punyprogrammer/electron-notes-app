import { homedir } from 'os'
import { appDirectoryName, fileEncoding } from '../../shared/constants'
import { ensureDir, readdir, stat, readFile, writeFile } from 'fs-extra'

import { NoteInfo } from '../../shared/model'
import { GetNotes, ReadNote, WriteNote } from '../../shared/types'

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
