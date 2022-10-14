import { useAuth } from '@redwoodjs/auth'

const UserAuthTools = () => {
  const { userMetadata, loading, isAuthenticated, logIn, logOut } = useAuth()

  const onClick = () => {
    ;(async () => {
      if (isAuthenticated) {
        await logOut({ returnTo: process.env.AUTH0_REDIRECT_URI })
      } else {
        const searchParams = new URLSearchParams(window.location.search)
        await logIn({
          appState: { targetUrl: searchParams.get('redirectTo') },
        })
      }
    })()
  }

  if (loading) {
    return null
  }

  return (
    <>
      {isAuthenticated && <span>Authenticated as: {userMetadata.email}</span>}
      <br></br>
      <button onClick={onClick}>
        <br></br>
        {isAuthenticated ? 'Log out' : 'Log in'}
      </button>
    </>
  )
}

export default UserAuthTools
