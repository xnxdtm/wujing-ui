<template>
  <div class="mind-map" id="map">
  </div>
</template>

<script>
import MindElixir, {E} from "mind-elixir";
import exmapleData from '../assets/1.js'

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
    this.ME = new MindElixir({
      el: "#map",
      direction: MindElixir.RIGHT,
      // data: MindElixir.new("new topic"),
      draggable: true, // default true
      contextMenu: true, // default true
      toolBar: true, // default true
      nodeMenu: false, // default true
      keypress: true, // default true
    });
    this.ME.init(MindElixir.new("new topic"));
    // this.ME.init();
    let allData = this.ME.getAllData();
    console.log(JSON.stringify(allData))
  },
}
</script>

<style scoped>
.mind-map {
  width: 100%;
  height: 100%;
}
</style>