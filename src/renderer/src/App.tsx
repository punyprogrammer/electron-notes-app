import { Content, RootLayout, Sidebar, DraggableTopbar } from './components'
import ActionButtonRows from './components/buttons/ActionButtonRows'

const App = () => {
  return (
    <>
      <DraggableTopbar />
      <RootLayout>
        <Sidebar className="p-2">
          <ActionButtonRows className="flex justify-between mt-1" />
        </Sidebar>
        <Content className="border-1 bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
