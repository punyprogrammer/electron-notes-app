import { ComponentProps } from 'react'
import { notesMock } from '../../../renderer/src/store/mocks/index'
import { NotePreview } from './NotePreview'
import { twMerge } from 'tailwind-merge'

export const NotesPreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if (notesMock.length === 0) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }
  return (
    <ul {...props}>
      {notesMock?.map((item) => <NotePreview key={item.title + item.lastEditTime} {...item} />)}
    </ul>
  )
}
