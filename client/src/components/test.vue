<template>
  <div id="22">
    test123123
    <div v-on:click="add"></div>
  </div>
</template>

<script>
export default {
  name: "test",
  path: "/test",
  components: {},
  data() {
    return { data: null };
  },
  methods: {
    add: function() {
      this.$router.push("/");
    }
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    }
  }
};
</script>

<style>
</style>