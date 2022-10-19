<script setup lang="ts">
  import { ref } from 'vue'
  import Header from '@components/Header/HeaderComponent/HeaderComponent.vue'
  import TopBar from '@components/TopBar/TopBar.vue'
  import Table from '@components/DataTable/TableComponent/TableComponent.vue'

  const search = ref<string[]>(['', 'Name'])
  const page = ref<number>(1)
  const activeChar = ref<boolean>(true)
  const handleSearchEvent = (searchText: string[]) => {
    search.value = searchText
  }
  const handlePageEvent = (currentPage: number) => {
    page.value = currentPage
  }
  const handleTabEvent = (isCharActive: boolean) => {
    activeChar.value = isCharActive
  }
</script>

<template>
  <Header
    @search="event => handleSearchEvent(event)"
    @current-page="event => handlePageEvent(event)"
  />
  <TopBar @active-char="event => handleTabEvent(event)" />
  <Table
    :search="search[0]"
    :options="search[1]"
    :page="page"
    :char-active="activeChar"
  />
</template>

<style lang="scss">
  @import 'https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap';

  body,
  html {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  * {
    font-family: Poppins, sans-serif;
    font-size: $font-size;
    color: $color-grey;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
