<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  import InlineSvg from 'vue-inline-svg'
  import nth from 'lodash.nth'
  import { Character } from '@common/types/common.types'

  import star from '@assets/svg/favorite-icon.svg'
  import male from '@assets/svg/male-sign.svg'
  import female from '@assets/svg/female-sign.svg'
  import genderless from '@assets/svg/genderless-sign.svg'
  import unknown from '@assets/svg/unknown-sign.svg'
  import type { RowCharcter } from './tableRow.types'

  interface Props {
    character: Character
    charActive: boolean
  }

  const props = defineProps<Props>()

  const filteredCharacter = ref<RowCharcter>({
    ...props.character,
    isChecked: false
  })
  const genderIcon = ref<string>('')

  onBeforeMount(() => {
    const episode = nth(Object.values(props.character.episode), -1)
    filteredCharacter.value.episode = episode.episode
    const { gender } = filteredCharacter.value

    if (gender === 'Male') genderIcon.value = male
    else if (gender === 'Female') genderIcon.value = female
    else if (gender === 'Genderless') genderIcon.value = genderless
    else if (gender === 'unknown') genderIcon.value = unknown
    const storageList = localStorage.getItem('favoriteList')
    if (storageList) {
      const list = JSON.parse(storageList)
      if (list.includes(filteredCharacter.value.id)) {
        filteredCharacter.value.isChecked = true
      } else {
        filteredCharacter.value.isChecked = false
      }
    }
  })

  const done = (): void => {
    filteredCharacter.value.isChecked = !filteredCharacter.value.isChecked
  }

  const favoriteHandler = (id: string) => {
    const storageList: string | null = localStorage.getItem('favoriteList')
    let parsed: string[] = []
    if (storageList) parsed = JSON.parse(storageList)
    // ADD TO STORAGE
    if (!storageList) {
      parsed.push(id)
      localStorage.setItem('favoriteList', JSON.stringify(parsed))
      done()
      return
    }
    // ADD TO EXISTING STORAGE
    if (storageList && !parsed.includes(id)) {
      parsed.push(id)
      localStorage.setItem('favoriteList', JSON.stringify(parsed))
      done()
      return
    }
    // REMOVE FROM STORAGE
    if (storageList && parsed.includes(id)) {
      const index = parsed.indexOf(id)
      if (index !== -1) {
        parsed.splice(index, 1)
      }
      localStorage.setItem('favoriteList', JSON.stringify(parsed))
      done()
    }
  }

  const hideFavorite = (charActive: boolean, isChecked: boolean) => {
    if (charActive) return true
    if (!charActive && isChecked) return true
    return false
  }
</script>

<template>
  <tr
    v-if="hideFavorite(charActive, filteredCharacter.isChecked)"
    class="table-row"
  >
    <td>
      <img
        :src="filteredCharacter.image"
        class="photo"
      />
    </td>
    <td>{{ filteredCharacter.id }}</td>
    <td>{{ filteredCharacter.name }}</td>
    <td class="gender">
      <inline-svg
        :src="genderIcon"
        class="gender-svg"
      />{{ filteredCharacter.gender }}
    </td>
    <td>{{ filteredCharacter.species }}</td>
    <td>{{ filteredCharacter.episode }}</td>
    <td
      class="favorite"
      :class="{ checked: filteredCharacter.isChecked }"
      @click="() => favoriteHandler(filteredCharacter.id)"
    >
      <inline-svg
        :src="star"
        :class="filteredCharacter.isChecked ? 'checked-svg' : 'favorite-svg'"
      />
    </td>
  </tr>
</template>

<style scoped lang="scss">
  .table-row {
    display: grid;
    grid-template-columns: repeat(7, calc(74rem / 7));
    align-items: center;
    border-bottom: 1px solid #e5eaf4;
    padding-left: 8.75rem;

    @media (max-width: 1320px) {
      padding-left: 1rem;
    }
  }

  .photo {
    display: block;
    height: 68px;
    width: 43px;

    @media (max-width: 1320px) {
      height: 50px;
      width: 30px;
    }

    object-fit: cover;
    padding: 0.5rem 0;
  }

  .gender {
    display: flex;
    align-items: center;

    .gender-svg {
      fill: #a9b1bd;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .favorite {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 43px;
    width: 43px;
    border: 2px solid $color-blue;
    border-radius: 8px;
    background-color: $color-white;
    cursor: pointer;

    .favorite-svg {
      width: 1.25rem;
      height: 1.25rem;
      fill: $color-blue;
    }
  }

  .checked {
    background-color: $color-blue;
  }

  .checked-svg {
    width: 1.25rem;
    height: 1.25rem;
    fill: $color-white;
  }
</style>
