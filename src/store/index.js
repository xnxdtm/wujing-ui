import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mindMapData: {
      "nodeData": {"id": "27cba6b127cd707e", "topic": "new topic", "root": true, "children": []},
      "linkData": {}
    },
    annotate: {},
    showAnnotate: false,
    mindMap: {},
  },
  getters: {
  },
  mutations: {
    changeMindMapData(state, data) {
      state.mindMapData = data
    },
    changeAnnotate(state, data) {
      state.annotate = data
    },
    changeShowAnnotate(state, data) {
      state.showAnnotate = data
    },
    changeMindMap(state, data) {
      state.mindMap = data
    }
  },
  actions: {
  },
  modules: {
  }
})
