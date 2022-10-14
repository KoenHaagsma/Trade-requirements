import { useAuth } from '@redwoodjs/auth'
import { useLazyQuery } from '@apollo/client'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

import {
  CreateWatchListMutation,
  CreateWatchListMutationVariables,
} from 'types/graphql'

const CREATE_WATCHLIST = gql`
  mutation CreateWatchListMutation($input: CreateWatchListInput!) {
    createWatchList(input: $input) {
      email
    }
  }
`

const QUERY = gql`
  query watchListEmail($input: String!) {
    watchlist: watchListEmail(email: $input) {
      email
    }
  }
`

const UserAuthTools = () => {
  const { userMetadata, loading, isAuthenticated, logIn, logOut } = useAuth()
  const [callQuery, { loading: lazyLoading, data, error }] = useLazyQuery(
    QUERY,
    {
      variables: {
        input: isAuthenticated ? String(userMetadata.name) : '',
      },
    }
  )
  const [create, { error: errorMutation }] = useMutation<
    CreateWatchListMutation,
    CreateWatchListMutationVariables
  >(CREATE_WATCHLIST)

  useEffect(() => {
    if (!isAuthenticated) return
    if (errorMutation) {
      toast.error(errorMutation.message)
      return
    }
    callQuery().then((res) => {
      console.log(res)
      if (res.data.watchlist === null) {
        create({
          variables: {
            input: {
              email: userMetadata.name,
            },
          },
        })
        toast.success('Watchlist created')
      } else {
        toast.error('Watchlist Already exists')
      }
    })
  }, [isAuthenticated])

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
