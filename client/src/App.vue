<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
      <div id="down">
        <p>© 2020-present sinlo.net</p>
       <p><a href="http://www.beian.miit.gov.cn/">桂ICP备20004106号</a></p>
     </div>
  </div>
</template>

<script>
// import index from './components/index.vue'

export default {
  name: "App",
  components: {},

  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
body {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  background: #f8f8f8;
}
#app{
  background: white;
}
#down{
  text-align: center;
   text-decoration: none;
}
a{

   text-decoration: none;
}
.go_back {
  width: 0.5rem;
  height: 0.5rem;
  float: left;
  position: relative;
  /* margin: 20px 0; */
  /* top: 0.25rem; */
  /* left: 0.25rem; */
  /* display:inline-block */
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.cur{
 cursor: pointer;
 /*css*/
-webkit-tap-height-color:transprent;
/*或者*/
-webkit-tap-highlight-color:rgba(0,0,0,0);
}
</style>
