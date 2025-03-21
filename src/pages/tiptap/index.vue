<script setup>
const load = useload()

onMounted(async () => {
  setTimeout(() => {
    // mounted.value = true
    load.value = false
  }, 100)
})
</script>
<template>
  <div>
    <h1>Editor con Comandos</h1>
    <client-only>
      <Editor />
    </client-only>
  </div>
</template>
