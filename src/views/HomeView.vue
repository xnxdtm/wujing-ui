<template>
  <div class="home">
    <top-nav></top-nav>
    <div class="home-body">
      <mind-map class="mind-map"></mind-map>
      <van-popup v-model="$store.state.showAnnotate"
                 position="right"
                 closeable
                 :style="{ width: '50%', height: '100%' }">
        <markdown class="annotate"></markdown>
      </van-popup>
    </div>
  </div>
</template>

<script>
import MindMap from "@/components/MindMap";
import TopNav from "@/components/TopNav";
import Markdown from "@/components/Markdown";

export default {
  name: 'HomeView',
  components: {
    Markdown,
    TopNav,
    MindMap
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-body {
    height: calc(100% - 61px);
    display: flex;
    flex: 1;

    .mind-map {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
