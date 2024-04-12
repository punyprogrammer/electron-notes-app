import { prop } from '@mdxeditor/editor'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '../store/index'

export const FloatingTItleText = ({ className, ...props }: ComponentProps<'div'>) => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  if (!selectedNote) return null
  return (
    <div className={twMerge('flex justify-center', className)} {...prop}>
      <span className="text-gray-400">{selectedNote?.title}</span>
    </div>
  )
}
