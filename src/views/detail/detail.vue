<!--  -->
<template>
  <!-- <div>详情{{iid}}</div> -->
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>

import detailNavBar from './childComps/detailNavBar'
import detailSwiper from './childComps/detailSwiper'

import { getDetail } from "network/detail";

export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topImages:[]
    };
  },
  created(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })

  },
  components:{
    detailNavBar,detailSwiper
  }
};
</script>
<style  scoped>
</style>