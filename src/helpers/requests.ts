import { batchRequests, request } from 'graphql-request'

const url = import.meta.env.VITE_API_URL

interface Query {
  document: string
}

export default async function requestApi(queries: string[]): Promise<any> {
  if (queries.length === 1) {
    return request(url, queries[0])
  }
  const queryList: Query[] = []
  queries.forEach(query => queryList.push({ document: query }))
  return batchRequests(url, queryList)
}
