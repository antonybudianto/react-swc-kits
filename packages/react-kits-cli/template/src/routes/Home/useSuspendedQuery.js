import { suspend } from 'suspend-react'

function useSuspendedQuery(useHook, baseOptions) {
  const [fetchData] = useHook()

  return suspend(
    async () => {
      const result = await fetchData(baseOptions)
      if (!result.data) {
        throw new Error('No data')
      }
      return result.data
    },
    [useHook.name, JSON.stringify(baseOptions?.variables)]
  )
}

export default useSuspendedQuery
