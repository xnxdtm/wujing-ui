<template>
  <div class="mind-map" id="map">
  </div>
</template>

<script>
import MindElixir, {E} from "mind-elixir";
import example from '../assets/1.js'

export default {
  name: "MindMap",
  data() {
    return {
      ME: null,
      mindData: {
        "nodeData": {"id": "27cba6b127cd707e", "topic": "new topic", "root": true, "children": []},
        "linkData": {}
      }
    }
  },
  mounted() {
    let options = {
      el: '#map',
      direction: MindElixir.RIGHT,
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: true, // default true
      keypress: true, // default true
      locale: 'en', // [zh_CN,zh_TW,en,ja,pt] waiting for PRs
      overflowHidden: false, // default false
      primaryLinkStyle: 2, // [1,2] default 1
      primaryNodeVerticalGap: 15, // default 25
      primaryNodeHorizontalGap: 15, // default 65
      contextMenuOption: {
        focus: true,
        link: true,
        extend: [
          {
            name: 'Node edit',
            onclick: () => {
              alert('extend menu')
            },
          },
        ],
      },
      allowUndo: false,
      before: {
        insertSibling(el, obj) {
          return true
        },
        async addChild(el, obj) {
          await sleep()
          return true
        },
      },
    }

    let mind = new MindElixir(options)
    let mindData = {
      nodeData: {
        id: 'root',
        topic: 'Mind Elixir',
        root: true,
        children: [
          {
            topic: 'What is Minde Elixir',
            id: 'bd4313fbac40284b',
            direction: 0,
            expanded: true,
            children: [
              {topic: 'A mind map core', id: 'beeb823afd6d2114'},
              {topic: 'Free', id: 'c1f068377de9f3a0'},
              {topic: 'Open-Source', id: 'c1f06d38a09f23ca'},
              {
                topic: 'Use without JavaScript framework',
                id: 'c1f06e4cbcf16463',
                expanded: true,
                children: [],
              },
              {
                topic: 'Use in your own project',
                id: 'c1f1f11a7fbf7550',
                children: [
                  {
                    topic: "import MindElixir from 'mind-elixir'",
                    id: 'c1f1e245b0a89f9b',
                  },
                  {topic: 'new MindElixir({...}).init(data)', id: 'c1f1ebc7072c8928'},
                ],
              },
              {
                topic: 'Easy to use',
                id: 'c1f0723c07b408d7',
                expanded: true,
                children: [
                  {
                    topic: 'Use it like other mind map application',
                    id: 'c1f09612fd89920d',
                  },
                ],
              },
            ],
          },
          {
            topic: 'Basics',
            id: 'bd1b66c4b56754d9',
            direction: 0,
            expanded: true,
            children: [
              {topic: 'tab - Create a child node', id: 'bd1b6892bcab126a'},
              {topic: 'enter - Create a sibling node', id: 'bd1b6b632a434b27'},
              {topic: 'del - Remove a node', id: 'bd1b983085187c0a'},
            ],
          }
        ],
        expanded: true,
      },
      linkData: {},
    }
    mind.init(mindData)
  },
}
</script>

<style scoped>
.mind-map {
  width: 100%;
  height: 100%;
}
</style>