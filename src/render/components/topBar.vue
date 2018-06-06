<template>
    <div class="top-bar">
        <div class="btns">
            <a class="min-btn" title='最小化' @click="minWindow"></a>
            <a class="close-btn" title="关闭" @click="closeWindow"></a>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    minWindow() {
      Electron.remote.BrowserWindow.getFocusedWindow().minimize();
    },
    closeWindow() {
      Electron.remote.BrowserWindow.getFocusedWindow().close();
    }
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 30px;
  box-sizing: border-box; // background-color: #5ab3ff;
  -webkit-app-region: drag;
}

.btns {
  float: right;
  -webkit-app-region: no-drag;
  a {
    display: block;
    width: 30px;
    height: 30px;
    float: left;
    transition: all 0.5s;
    cursor: pointer;
  }
  .min-btn {
    background: url(../assets/minbutton_normal.png) center;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .close-btn {
    background: url(../assets/closebutton_normal.png) center;
    border-top-right-radius: 2px;
    &:hover {
      background-color: #fb6155;
    }
  }
}
</style>
