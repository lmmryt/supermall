<!--  -->
<template>

  <swiper class="swiper-item">
    <swiper-item v-for="item in topImages"
                 class="">
      <img :src="item"
           alt="">
    </swiper-item>
  </swiper>

</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "detailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>
<style  scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>