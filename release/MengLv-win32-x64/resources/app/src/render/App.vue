<template>
  <div class="main-wrap">
    <top-bar></top-bar>
  </div>
</template>

<script>
import topBar from './components/topBar.vue'

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    topBar
  },
  methods: {
    aaa() {
      Electron.remote.BrowserWindow.getFocusedWindow().minimize();
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
.main-wrap {
  margin: 0;
  padding: 0;
  height: 100%;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
