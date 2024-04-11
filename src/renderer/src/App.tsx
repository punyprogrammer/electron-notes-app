import { Content, RootLayout, Sidebar, DraggableTopbar } from './components'

const App = () => {
  return (
    <>
      <DraggableTopbar />
      <RootLayout>
        <Sidebar className="p-2"> Sidebar</Sidebar>
        <Content className="border-1 bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
