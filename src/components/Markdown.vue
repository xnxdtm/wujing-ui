<template>
  <div class="markdown">
    <div id="vditor"></div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/src/assets/less/index.less'
import {changeAnnotate, changeMindMap} from "@/assets/api";

export default {
  name: "Markdown",
  mounted() {
    this.vditor = new Vditor('vditor', this.options)
  },
  data() {
    return {
      options: {
        width: '100%',
        height: '100%',
        toolbarConfig: {
          hide: true
        },
        cache: {
          enable: false
        },
        input: this.changeInput
      },
      vditor: null
    }
  },
  methods: {
    changeInput(data) {
      this.$store.state.annotate.content = data
      this.$axios.post(changeAnnotate, this.$store.state.annotate)
          .then(res => {
            console.log('changeAnnotate', res.data)
          })
    }
  },
  computed:{
    annotate(){
      return this.$store.state.annotate
    }
  },
  watch:{
    annotate (newVal, oldVal) {
      // 修改编辑器的内容
      setTimeout(() => {
        this.options.value = this.$store.state.annotate.content
        this.vditor = new Vditor('vditor', this.options)
      }, 0)
    }
  },

}
</script>

<style scoped lang="less">
.markdown {
  width: 100%;
  height: 100%;

  .vditor {
    width: 100%;
    height: 100%;

    /deep/
    .vditor-toolbar {
      display: none;
    }

  }
}

</style>