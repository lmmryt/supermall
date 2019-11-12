<!--  -->
<template>

  <swiper class="detail-swiper" v-if="images.length">
    <!--  :key="item" 这个挺重要的，否则轮播图不能正常轮播-->
    <swiper-item v-for="(item,index) in images"
                 class="" :key="index">
      <img :src="item"
           alt="">
    </swiper-item>
  </swiper>

</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "detailSwiper",
   components: {
    Swiper,
    SwiperItem
  },
  props: {
    images: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
 
};
</script>
<style  scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>