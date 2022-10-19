<script setup lang="ts">
  export interface Props {
    items: string[]
  }

  defineProps<Props>()
</script>

<template>
  <thead class="table-header">
    <tr class="table-header-row">
      <th
        v-for="(item, index) in items"
        :key="index"
        class="table-header-item"
      >
        {{ item }}
      </th>
    </tr>
  </thead>
</template>

<style scoped lang="scss">
  .table-header {
    width: 100%;
    display: flex;
    height: 50px;
    background-color: $header-color;
    align-items: center;
    text-align: left;

    &-row {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      width: 74rem;
      padding-left: 8.75rem;

      @media (max-width: 1320px) {
        padding-left: 1rem;
      }
    }

    &-item {
      font-weight: 500;
    }
  }
</style>
