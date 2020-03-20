<template>
  <div id="add_com">
    <div id="add_top">
      <div id="add_titleInfo">
        <!-- 
        <h1 id="add_title" >日常账单</h1>-->
        <div style="position:absolute;top:0px;text-align:center;width:100%;font-size:0.4rem;"><h5>日常账单</h5></div>
        <div style="position:absolute;top:0px;float:left;text-align:left;width:100%">
          <router-link to="/">
            <img src="../assets/icon_back_black.png" class="go_back" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add_com",
  path: "/add",
  components: {},
  data() {
    return { data: null };
  },
  methods: {
    add: function() {
      this.$router.push("/");
    }
  },
  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
  }
};
</script>

<style>
#add_top {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: cover;
  height: 1rem;
 
  text-align: center;
}
#add_titleInfo {
  /* background: red; */
position: relative;
top: 0.2rem;
width: 90%;
margin: 0 auto;
}
#add_title {
  color: #000;
  font-size: 0.3rem;
  /* position: absolute; */
  /* vertical-align: middle; */
  /* display: inline-block; */
  /* float: none; */
}
</style>