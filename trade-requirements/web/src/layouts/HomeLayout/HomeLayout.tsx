import { useAuth } from '@redwoodjs/auth'
import { routes, Link } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import UserAuthTools from 'src/components/UserAuthTools/UserAuthTools'

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
        <section className={'align-center mt-16 flex flex-col text-center'}>
          <UserAuthTools />
        </section>
      </header>

      <main className={'w-full bg-darkWhite py-4 px-6'}>
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
