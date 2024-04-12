import { homedir } from 'os'
import { appDirectoryName, fileEncoding } from '../../shared/constants'
import { ensureDir, readdir, stat } from 'fs-extra'

import { NoteInfo } from '../../shared/model'
import { GetNotes } from '../../shared/types'
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
  console.log(notes)
  return Promise.all(notes.map((note) => getNoteInfoFromFilename(note)))
}

export const getNoteInfoFromFilename = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getHomeDir()}/${fileName}`)
  return {
    title: fileName.replace('.md', ''),
    lastEditTime: fileStats.mtimeMs
  }
}
