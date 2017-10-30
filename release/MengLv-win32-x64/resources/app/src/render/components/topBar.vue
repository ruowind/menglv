<template>
    <div class="top-bar">
        <div class="btns">
            <a class="min-btn" title='最小化'></a>
            <a class="close-btn" title="关闭"></a>
        </div>
    </div>
</template>

<script>
export default {

}
</script>


<style lang="scss" scoped>
.top-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    // background-color: #288ADD;
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
        transition: all .5s;
        cursor: pointer;
    }
    .min-btn {
        background: url(../assets/minbutton_normal.png) center;
        &:hover {
            background-color: rgba(255, 255, 255, .2)
        }
    }
    .close-btn {
        background: url(../assets/closebutton_normal.png) center;
        &:hover {
            background-color: #FB6155;
        }
    }
}
</style>
