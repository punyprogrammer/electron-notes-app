import { ComponentProps } from 'react'
import { notesMock } from '../../../renderer/src/store/mocks/index'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '../hooks/useNotesList'

export type NotesPreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}
export const NotesPreviewList = ({ className, onSelect, ...props }: NotesPreviewListProps) => {
  const { notes, selectedNoteIndex, handleOnSelect } = useNotesList({ onSelect })
  if (notes.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }
  return (
    <ul className={className} {...props}>
      {notes?.map((item, index) => (
        <NotePreview
          key={item.title + item.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleOnSelect(index)}
          {...item}
        />
      ))}
    </ul>
  )
}
