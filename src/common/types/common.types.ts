type Episode = { episode: string }[] | string

export interface Character {
  image: string
  id: string
  name: string
  gender: string
  species: string
  episode: Episode
}
