<template>
  <div id="login_com">


    
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},

  mounted() {},
  data() {
    return { data: null };
  },
  methods: {
    onBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style>
#login_com {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
}
</style>