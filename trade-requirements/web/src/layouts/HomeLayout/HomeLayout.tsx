type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <header className={'p-4'}>
        <h1>Trade requirements</h1>
        <nav>
          <ul></ul>
        </nav>
      </header>
      <main className={'p-4'}>{children}</main>
    </>
  )
}

export default HomeLayout
