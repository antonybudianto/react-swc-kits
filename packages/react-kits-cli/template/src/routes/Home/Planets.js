import { useEffect, useMemo, useRef } from 'react'
import { useQuery } from 'urql'

const PLANET_QUERY = `
  query a {
    allPlanets {
      planets {
        name
      }
    }
  }
`

function ExchangeRates() {
  const [result] = useQuery({ query: PLANET_QUERY })
  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.allPlanets.planets.map(({ name }) => (
    <div key={name}>
      <p>{name}</p>
    </div>
  ))
}

export default ExchangeRates
