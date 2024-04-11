import { prop } from '@mdxeditor/editor'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const FloatingTItleText = ({ className, ...props }: ComponentProps<'div'>) => {
  const title = 'Floating note text'
  return (
    <div className={twMerge('flex justify-center', className)} {...prop}>
      <span className="text-gray-400">{title}</span>
    </div>
  )
}
