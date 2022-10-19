import { gql } from 'graphql-request'

export const queryAll = (search: string, page: number): string => {
  return gql`		
		query {
			characters(filter: { name: "${search}" } page: ${page}) {
				results {
					image
					id
					name
					gender
					species
					episode {
						episode
					}
				}
			}
		}
	`
}

export const queryAllCount = (search: string, requestPage: number): string => {
  return gql`
			query {
				characters(filter: { name: "${search}" } page: ${requestPage}) {
					info {
						count
					}
				}
			}
		`
}

export const queryEpisode = (search = 'S01E01'): string => {
  return gql`
			query {
				episodes(filter: { episode: "${search}" }) {
					results {
						characters {
							image
							id
							name
							gender
							species
							episode {
								episode
							}
						}
					}
				}
			}
		`
}

export const queryFavorite = (storage: string): string => {
  return gql`
				query {
					charactersByIds(ids: ${storage}) {
						image
						id
						name
						gender
						species
						episode {
							episode
						}
					}
				}
			`
}
