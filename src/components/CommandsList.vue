<template>
  <div class="dropdown-menu-editor">
    <template v-if="items.length">
      <button
        v-for="(item, index) in items"
        :key="index"
        type="button"
        :class="{ 'is-selected': index === selectedIndex }"
        @click="selectItem(index)"
      >
        {{ item.title }}
      </button>
    </template>
    <div
      v-else
      class="item"
    >
      No hay resultados
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  command: {
    type: Function,
    default: () => {},
  },
})

const selectedIndex = ref(0)

watch(() => props.items, () => {
  selectedIndex.value = 0
})

function selectItem(index) {
  const item = props.items[index]
  if (item) {
    props.command(item)
  }
}

function onKeyDown({ event }) {
  if (event.key === 'ArrowUp') {
    selectedIndex.value = (selectedIndex.value - 1 + props.items.length) % props.items.length
    return true
  }

  if (event.key === 'ArrowDown') {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length
    return true
  }

  if (event.key === 'Enter') {
    selectItem(selectedIndex.value)
    return true
  }

  return false
}

// ⬇️ Exportamos método para que Suggestion pueda usarlo
defineExpose({ onKeyDown })
</script>

<style scoped>
.dropdown-menu-editor {
  background: rgb(255, 255, 255);
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  position: absolute;
  z-index: 999;
}
button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 6px;
  border: none;
  background: none;
  cursor: pointer;
}
button:hover,
button.is-selected {
  background-color: #f3f3f3;
}
</style>
