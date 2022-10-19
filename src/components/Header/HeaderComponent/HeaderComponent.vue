<script setup lang="ts">
  import SearchBar from '@components/Header/SearchBar/SearchBar.vue'

  export interface Emits {
    (event: 'search', msg: string[]): void
    (event: 'currentPage', page: number): void
  }

  const emit = defineEmits<Emits>()

  const passEmit = (searchText: string[]) => {
    emit('search', searchText)
  }
  const passPageEmit = (currentPage: number) => {
    emit('currentPage', currentPage)
  }
</script>

<template>
  <div class="header">
    <img
      class="logo"
      alt="Rick and Morty logo"
      src="@assets/svg/logo.svg"
    />
    <SearchBar
      @search="event => passEmit(event)"
      @current-page="event => passPageEmit(event)"
    />
  </div>
</template>

<style scoped lang="scss">
  .header {
    display: flex;
    padding: 2rem 2rem 2rem 8.75rem;

    @media (max-width: 1320px) {
      padding-left: 1rem;
    }

    border-bottom: 1px solid $color-light-grey;
    align-items: center;
  }

  .logo {
    margin-right: 5rem;

    @media (max-width: 1320px) {
      padding-left: 1rem;
      margin-right: 1rem;
      height: 2rem;
    }
  }
</style>
