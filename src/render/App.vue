<template>
  <div class="main-wrap">
    <top-bar></top-bar>
    <div class="projects">
      <div class="projects-header">项目列表</div>
      <div class="projects__list" id="js-project-list">

        <!-- <div class="projects__list-item projects__list-item_current projects__list-item_watching" data-project="tmh_list" title="E:\test\tmh_list\tmh_list">
          <span class="icon icon-finder" data-finder="true" title="在 文件夹 中查看"></span>
          <div class="projects__list-content">
            <span class="projects__name">tmh_list</span>
            <div class="projects__path">E:\test\tmh_list\tmh_list</div>
          </div>
          <a href="javascript:;" class="icon icon-info projects__info" title="项目设置"></a>
        </div> -->

        <div v-for="{p,key} in projects" v-bind:key="key" v-bind:class="getProjectClass(key)" v-bind:title="p.remoteObj.path">
          <span class="icon icon-finder" data-finder="true" title="在 文件夹 中查看"></span>
          <div class="projects__list-content">
            <span class="projects__name">{{p.remoteObj.name}}</span>
            <div class="projects__path">{{p.remoteObj.path}}</div>
          </div>
          <a href="javascript:;" class="icon icon-info projects__info" title="项目设置"></a>
        </div>

      </div>
    </div>
    <div class="logs logs_show" id="js-log">
      <span class="icon icon-clean" id="js-clean-log" title="清除日志"></span>
      <div class="logs__inner">
        <div>
          <span class="logs__time">[16:20:59]</span> Listening has quit.
        </div>
        <div>
          <span class="logs__time">[16:20:59]</span> Listening has quit.
        </div>
      </div>
    </div>
    <div class="tool-bar">
      <div class="tool-1">
        <a title="添加项目" class="add"></a>
        <a title="删除项目" class="delete"></a>
        <a title="全局设置" class="setting"></a>
      </div>
      <div class="tool-2">
        <a>开发</a>
        <a>打包</a>
        <a>复制</a>
      </div>
    </div>
  </div>
</template>

<script>
import topBar from "./components/topBar.vue";

export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      projects: {}
    };
  },
  components: {
    topBar
  },
  methods: {
    // aaa() {
    //   Electron.remote.BrowserWindow.getFocusedWindow().minimize();
    // },
    getProjectClass(id) {
      console.log(id)
      let classes = [];
      classes.push("projects__list-item");
      this.projects[id].remoteObj.current && classes.push("projects__list-item_current");
      this.projects[id].remoteObj.watching &&
        classes.push("projects__list-item_watching");
      return classes;
    }
  },
  mounted() {
    this.projects = {
      a: {
        svnPage: "",
        svnStatic: "",
        livereload: true,
        reversion: true,
        compress: false,
        support2x: true,
        jsPath: "js",
        cssPath: "css",
        lessPath: "less",
        sassPath: "sass",
        imgPath: "images",
        projectPath: "searchList/tuangou",
        remoteObj: {
          name: "Test",
          path: "E:\\test\\tmh_list\\tmh_list",
          current: false,
          watching: false
        }
      },
      b: {
        svnPage: "",
        svnStatic: "",
        livereload: true,
        reversion: true,
        compress: false,
        support2x: true,
        jsPath: "js",
        cssPath: "css",
        lessPath: "less",
        sassPath: "sass",
        imgPath: "images",
        projectPath: "searchList/tuangou",
        remoteObj: {
          name: "Test12",
          path: "E:\\test\\tmh_list\\tmh_list",
          current: true,
          watching: false
        }
      }
    };
    // Electron.ipcRenderer.send("aa", "ping");
  }
};
</script>

<style lang="scss">
@import "./styles/index";
</style>
