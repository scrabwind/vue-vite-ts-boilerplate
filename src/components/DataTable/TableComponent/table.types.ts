import type { Character } from '../../../common/types/common.types'

export type TableCharacter = Character

export interface Response {
  characters: {
    results: Character[]
  }
}

export interface CountResponse {
  characters: {
    info: {
      count: number
    }
  }
}
