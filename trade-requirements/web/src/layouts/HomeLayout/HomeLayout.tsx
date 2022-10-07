import { routes, Link } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type HomeLayoutProps = {
  children?: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <header className={'mx-12 flex h-screen flex-col items-center bg-white'}>
        <h1 className={'mt-8'}>Trade requirements</h1>
        <nav className={'mt-16'}>
          <ul>
            <li>
              <Link
                className={'rounded-lg bg-dark px-16 py-3 text-white'}
                to={routes.home()}
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
        <section className={'mt-16'}>Login section</section>
      </header>

      <main className={'w-full bg-darkWhite p-4'}>
        <Toaster
          toastOptions={{
            position: 'top-right',
          }}
        />
        {children}
      </main>
    </>
  )
}

export default HomeLayout
