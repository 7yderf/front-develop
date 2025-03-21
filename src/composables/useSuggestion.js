import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'

import CommandsList from '~/components/CommandsList.vue'

console.log('CommandsList:', CommandsList)

export default {
  items: ({ query }) => [
    {
      title: 'Encabezado H1',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 })
          .run()
      },
    },
    {
      title: 'Encabezado H2',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 })
          .run()
      },
    },
    {
      title: 'Negritas',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark('bold')
          .run()
      },
    },
    {
      title: 'Cursiva',
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark('italic')
          .run()
      },
    },
  ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5),

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        console.log('🚀 ~ props.editor:', props)
        // if (!props.editor) return

        console.log('onStart triggered')
        component = new VueRenderer(CommandsList, { props, editor: props.editor })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }
        popup[0].setProps({ getReferenceClientRect: props.clientRect })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()
          return true
        }
        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
