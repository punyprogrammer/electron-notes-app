import {
  Content,
  RootLayout,
  Sidebar,
  DraggableTopbar,
  NotesPreviewList,
  MarkdownEditor,
  FloatingTItleText
} from './components'
import ActionButtonRows from './components/buttons/ActionButtonRows'

const App = () => {
  return (
    <>
      <DraggableTopbar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonRows className="flex justify-between mt-1" />
          <NotesPreviewList className="mt-3 space-y-1" />
        </Sidebar>
        <Content className="border-1 bg-zinc-900/50 border-l-white/20">
          <FloatingTItleText className="pt-2" />
          <MarkdownEditor />¸
        </Content>
      </RootLayout>
    </>
  )
}

export default App
