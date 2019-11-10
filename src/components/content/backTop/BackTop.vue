<!--  -->
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png"
         alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods:{
    backBtn(){
      // 回到顶部
      this.$emit('backBtn')
    }
  }
};
</script>
<style  scoped>
.back-top{
  position: fixed;
  bottom: 50px;
  right: 10px;
  z-index: 10000;

}
img{
  width: 40px;
}
</style>