<template>
  <div class="mind-map" id="map">
  </div>
</template>

<script>
import MindElixir, {E} from "mind-elixir";
import {changeMindMap, getNodeAnnotate} from "@/assets/api";

export default {
  name: "MindMap",
  data() {
    return {
      ME: null,
      MEOption: null,
    }
  },
  mounted() {
    this.MEOption = {
      el: '#map',
      direction: MindElixir.SIDE,
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
    this.initME()
  },
  methods: {
    initME() {
      this.ME = new MindElixir(this.MEOption)
      this.ME.init(this.$store.state.mindMapData)
      this.ME.bus.addListener('selectNode', node => {
        this.$axios.get(getNodeAnnotate + '?id=' + node.id)
          .then(res => {
            if (res.data.data) {
              this.$store.commit('changeAnnotate', res.data.data)
              console.log('annotate: ', this.$store.state.annotate)
            } else {
              this.$store.commit('changeAnnotate', {nodeId: node.id})
            }
          })
        console.log('clickNode: ', node)
        if (node.style && node.style.background && '#2ecc71' === node.style.background) {
          this.$store.commit('changeShowAnnotate', true)
        }
      })
      this.ME.bus.addListener('operation', operation => {
        console.log('operation,,', operation)
        if (/removeNode|finishEdit|addChild|editStyle/.exec(operation.name)) {
          let data = this.$store.state.mindMap
          data.content = this.ME.getAllDataString()
          this.$axios.post(changeMindMap, data)
            .then(res => {
              console.log(res.data)
            })
        }
      })
    }
  },
  computed:{
    listData(){
      return this.$store.state.mindMapData
    }
  },
  watch:{
    listData (newVal, oldVal) {
      this.initME()
    }
  },
}
</script>

<style scoped>
.mind-map {
  width: 100%;
  height: 100%;
}
</style>