import { useAtomValue, useSetAtom } from 'jotai'
import { saveNoteAtom, selectedNoteAtom } from '../store/index'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { useRef } from 'react'
import { NoteContent } from 'src/shared/model'
import { throttle } from 'lodash'
import { autoSaveThrottleDuration } from '../../../shared/constants'
export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods | null>(null)
  // throttle the handle autosave
  const handleAutoSave = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return
      await saveNote(content)
    },
    autoSaveThrottleDuration,
    { leading: false, trailing: true }
  )
  // handle on blur event
  const handleBlur = async () => {
    if (!selectedNote) return
    // cancel the throttle
    handleAutoSave.cancel()
    const content = editorRef.current?.getMarkdown()
    if (content != null) {
      await saveNote(content)
    }
  }
  return {
    editorRef,
    handleAutoSave,
    selectedNote,
    handleBlur
  }
}
