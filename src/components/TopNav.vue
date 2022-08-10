<template>
  <div class="top-nav">
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-submenu v-for="(item, index) in list" :index="'' + index">
        <template slot="title">{{item.name}}</template>
        <el-menu-item v-for="(item2, index2) in item.children" :index="index + '-' +index2">{{item2.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {getCategory, getMindMapByCategoryId} from "@/assets/api";

export default {
  name: "TopNav",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      list: [],
      mindMapData: {},
    };
  },
  mounted() {
    this.$axios.get(getCategory)
      .then(res => {
        this.list = res.data.data;
        console.log(this.list)
        this.sortCategory()
      })
  },
  methods: {
    sortCategory() {
      let first = this.list.filter(item => {return item.parentId === 0});
      first.forEach(item => {
        item.children = this.list.filter(item2 => {
          return item2.parentId === item.id
        })
      })
      console.log(first)
      this.list = first
    },

    handleSelect(key, keyPath) {
      let split = key.split('-');
      let ele = this.list[parseInt(split[0])].children[parseInt(split[1])];
      this.$axios.get(getMindMapByCategoryId + '?id=' + ele.id)
        .then(res => {
          let data = res.data.data
          let content = JSON.parse(data.content);
          console.log(content)
          this.$store.commit('changeMindMapData', content)
          this.$store.commit('changeMindMap', data)
        })
    }
  }
}
</script>

<style scoped>

</style>