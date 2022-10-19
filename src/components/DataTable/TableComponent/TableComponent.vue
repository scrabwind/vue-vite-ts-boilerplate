<script setup lang="ts">
  import { computed, ref, toRefs, watch, watchEffect } from 'vue'
  import requestApi from '@helpers/requests'
  import {
    queryAll,
    queryAllCount,
    queryEpisode,
    queryFavorite
  } from '@helpers/queries'

  import Pagination from '@components/DataTable/PaginationComponent/PaginationComponent.vue'

  import TableHeader from '@components/DataTable/TableHeader/TableHeader.vue'
  import TableRow from '@components/DataTable/TableRow/TableRow.vue'
  import type { TableCharacter } from './table.types'

  interface Props {
    search: string
    options: string
    page: number
    charActive: boolean
  }

  const elementsPerPage = parseInt(import.meta.env.VITE_ELEMENTS_PER_PAGE, 10)
  const apiPageSize = parseInt(import.meta.env.VITE_API_PAGE_SIZE, 10)

  const categories: string[] = [
    'Photo',
    'Character ID',
    'Name',
    'Gender',
    'Species',
    'Last Episode',
    'Add To Favorites'
  ]

  const props = defineProps<Props>()
  const { search, options, charActive } = toRefs(props)
  const characters = ref<TableCharacter[]>([])
  const charCount = ref<number>(1)
  const requestPage = ref<number>(1)
  const page = ref<number>(1)

  const pageCount = computed(() =>
    charCount.value % elementsPerPage === 0
      ? charCount.value / elementsPerPage
      : Math.floor(charCount.value / elementsPerPage) + 1
  )

  const nameOption = async (): Promise<void> => {
    requestPage.value = Math.ceil((page.value * elementsPerPage) / 20)
    const [data, countData] = await requestApi([
      queryAll(search.value, requestPage.value),
      queryAllCount(search.value, requestPage.value)
    ])
    charCount.value = countData.data.characters.info.count
    const value = ((page.value - 1) * elementsPerPage) % apiPageSize
    if (page.value % 10 === 0) {
      const together = []
      const req2 = requestPage.value + 1
      const page2 = await requestApi([queryAll(search.value, req2)])
      together.push(...data.data.characters.results)
      together.push(...page2.characters.results)
      characters.value = together.slice(value, value + elementsPerPage)
      return
    }
    if ((page.value * elementsPerPage) % apiPageSize < 6) {
      const together = []
      const req2 = requestPage.value - 1
      const page2 = await requestApi([queryAll(search.value, req2)])
      together.push(...page2.characters.results)
      together.push(...data.data.characters.results)
      characters.value = together.slice(value, value + elementsPerPage)
      return
    }
    characters.value = data.data.characters.results.slice(
      value,
      value + elementsPerPage
    )
  }

  const episodeOption = async (): Promise<void> => {
    const value = (page.value - 1) * elementsPerPage

    const data = await requestApi([queryEpisode(search.value)])
    charCount.value = data.episodes.results[0].characters.length
    characters.value = data.episodes.results[0].characters.slice(
      value,
      value + elementsPerPage
    )
  }

  const favoriteOption = async (): Promise<void> => {
    const storage = localStorage.getItem('favoriteList')
    if (!storage) return
    charCount.value = JSON.parse(storage).length
    const value = (page.value - 1) * elementsPerPage
    const data = await requestApi([queryFavorite(storage)])
    characters.value = data.charactersByIds.slice(
      value,
      value + elementsPerPage
    )
  }

  const tabs = async (isCharActive: boolean): Promise<void> => {
    if (isCharActive) {
      if (options.value === 'Name') return nameOption()
      if (options.value === 'Episode') return episodeOption()
    }
    return favoriteOption()
  }

  watchEffect(() => {
    characters.value = []
    charCount.value = 0
    requestPage.value = 1
    tabs(charActive.value)
  })

  watch([search, charActive], () => {
    page.value = 1
  })
</script>

<template>
  <table>
    <TableHeader
      class="table-header"
      :items="categories"
    />
    <tbody class="tbody">
      <TableRow
        v-for="character in characters"
        :key="character.id"
        :character="character"
        :char-active="charActive"
      />
    </tbody>
  </table>
  <Pagination
    v-model="page"
    :pages="pageCount"
    :range-size="1"
  />
</template>
<style scoped lang="scss">
  .table {
    width: 100%;
    overflow-x: scroll;
  }

  .tbody {
    height: 524px;
  }
</style>
