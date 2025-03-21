<script setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
// import Image from '@tiptap/extension-image'
// import Link from '@tiptap/extension-link'
import useCommands from '@/composables/useCommands'
import useSuggestion from '@/composables/useSuggestion'

const content = ref(`
        <p>usa slash</p>
        <p></p>
        <p></p>
      `)

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      // Image,
      // Link,
      useCommands.configure({
        suggestion: useSuggestion,
      }),
    ],
    content: content.value,
    // onUpdate({ editor }) {
    //   content.value = editor.getHTML()
    // },
  })

  // editor.value?.commands.focus() // ✅ Forzar foco
})
</script>

<template>
  <div
    v-if="editor"
    class="editor-container"
  >
    <client-only>
      <EditorContent :editor="editor" />
    </client-only>
  </div>
</template>

<style>
.editor-container {
  border: 1px solid #ddd;
  padding: 10px;
  background: white;
}
</style>
