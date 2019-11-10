<!--  -->
<template>
  <!-- 
  ref可以明确地获取子组件
  普通元素也可以绑定ref获取元素对象
 -->
  <div class="wrapper"
       ref="wrapper">
    <div class="conent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import bscroll from "better-scroll";
import { log } from "util";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1.创建
    this.scroll = new bscroll(this.$refs.wrapper, {
      click: true,
      // 为了不影响性能
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // this.scroll.scrollTo(0,0)
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scrollPosition", position);
      });
    }

    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉');
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    refresh() {
      // console.log(11);

      // 触发时机：refresh 方法调用完成后。
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>
<style  scoped>
</style>