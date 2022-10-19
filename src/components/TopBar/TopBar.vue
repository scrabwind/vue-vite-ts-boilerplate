<script setup lang="ts">
  import { ref, watchEffect } from 'vue'

  interface Emits {
    (event: 'activeChar', msg: boolean): void
  }

  const isCharActive = ref<boolean>(true)
  const emit = defineEmits<Emits>()

  watchEffect(() => {
    emit('activeChar', isCharActive.value)
  })
</script>

<template>
  <div class="top-bar">
    <div
      class="button"
      :class="isCharActive ? 'active' : 'hover'"
      @click="() => (isCharActive = true)"
    >
      All characters
    </div>
    <div
      class="button"
      :class="!isCharActive ? 'active' : 'hover'"
      @click="() => (isCharActive = false)"
    >
      Favorite
    </div>
  </div>
</template>

<style scoped lang="scss">
  .top-bar {
    display: flex;
    padding: 2rem 2rem 2rem 8.75rem;

    @media (max-width: 1320px) {
      padding-left: 1rem;
    }
  }

  .button {
    cursor: pointer;
    padding: 0;
    margin: 0 5rem 0 0;
  }

  .active {
    color: $color-blue;
    border-bottom: 3px solid $color-blue;
  }

  .hover:hover {
    border-bottom: 3px solid $color-grey;
  }
</style>
