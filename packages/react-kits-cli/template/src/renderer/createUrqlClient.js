import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange
} from '@urql/core'

const isServerSide = typeof window === 'undefined'

const createUrqlClient = () => {
  const ssr = ssrExchange({
    isClient: !isServerSide,
    initialState: !isServerSide ? window.__URQL_DATA__ : undefined
  })

  const client = createClient({
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    suspense: true,
    exchanges: [dedupExchange, cacheExchange, ssr, fetchExchange]
  })

  return { client, ssr }
}

export default createUrqlClient
