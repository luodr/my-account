<template>
  <div id="main">
         <div    id="banner"> 
            <div class="content">
         <div class="banner_top">
           
            </div>
         
       <div class="bannerbottom"> 
         <ul class="month_title">
         <li>本月支出</li>
         <li>本月收入</li>
         <li></li>
         </ul>
       
       <ul class="month_info">
         <li style="  border-right: white solid 1px;">222</li>
         <li>22</li>
         <li></li>
         </ul>
       </div>
           </div>
         
        </div>
          <listInfo></listInfo>
        <div id="add"  v-on:click="add"> </div>
   </div>
   
</template>

<script>
import listInfo from "./listInfo.vue";

export default {
  name: 'App',
  components: {
     listInfo
  },
  data(){
    
     },  methods: {
    add: function () {
      
      alert('Hello ' )
    
      }
    }
}
</script>

<style>
#main{
      
      /* min-height:100vh; */
   color: white;
}
.content{
     max-width: 540px;
     width: 100%;
    margin: 0 auto;
}
#banner{
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    background:url(../assets/banner.png);
      background-repeat: no-repeat;
    background-size: cover;
   height: 3rem;
   text-align: center;
}
#add{
  
  
width: 100px;
height: 100px;
position:fixed;
left:50%;
bottom: 0.2rem;
/* margin-top:-50px; */

margin-left:-50px;
   background:url(../assets/voice_guide_00016.png);
     background-repeat: no-repeat;
    background-size: cover;
    z-index: 999; 
}
.banner_top{
   height: 1.2rem;
}

.bannerbottom ul li{
width: 49%;
  float: left;

  list-style: none;
}
.month_info {
  position: relative;
  top: 0.3rem;
  font-size: 0.3rem;
}

</style>