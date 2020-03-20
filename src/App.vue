<template>
  <div id="app">
    <transition>
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
// import index from './components/index.vue'

export default {
  name: "App",
  components: {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
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
</style>
