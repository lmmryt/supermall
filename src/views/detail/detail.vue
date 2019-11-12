<!--  -->
<template>
  <!-- <div>详情{{iid}}</div> -->
  <div id="detail">
    <detail-nav-bar class="d_navbar"
                    @titleClick='titleClick'></detail-nav-bar>
    <scroll class="d_scroll"
            ref="scroll">
      <detail-swiper :images="topImages" />
      <detail-base :goods='goods'></detail-base>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info='detailInfo'
                         @imageLoad="imgLoad"></detail-goods-info>
      <detail-params-info :param-info="itemParams"
                          ref="params"></detail-params-info>
      <detail-comment-info :comment-info='commentInfo'
                           ref="comment"></detail-comment-info>
      <goods-list :goods="recommends"
                  ref="recommend" />
    </scroll>
  </div>
</template>

<script>
import detailNavBar from "./childComps/detailNavBar";
import detailSwiper from "./childComps/detailSwiper";
import detailBase from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import { getDetail, Goods, Shop, getRecommend } from "network/detail";
import scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { itemListenerMixin } from "common/mixin";
import { debounce } from "common/utils";

export default {
  name: "detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY:null
    };
  },
  mixins: [itemListenerMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 5.取出参数的信息
      this.itemParams = data.itemParams;
      // 6.取出评论信息
      // 有些可能无评论，需要判断

      this.commentInfo = data.rate.cRate !== 0 ? data.rate.list[0] : {};
      // 这个函数  等前面的渲染完就会在这里回调
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM已经被渲染出来
      //   // 但是图片依然是没有加载完的
      //   // offsettop一般值不对的时候就是图片没有加载完
      //   // 值还是不对
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   // console.log(this.themeTopYs);
      // });
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    // 4.
    this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-49);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-49);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-49);
        console.log(this.themeTopYs);
    },100)
  },
  updated() {},

  destroyed() {
    // 要取消绑定的 itemImageLoad,因为home和detail都用的，但是这个detail没有写在keep-alive中
    // 所以这里不能调用deactivated
    this.$bus.$off("itemImageLoad", this.homeImgLoad);
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
      console.log(this.getThemeTopY);
      
      this.getThemeTopY()
    },
    titleClick(index) {
      console.log(this.themeTopYs[index]);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    }
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBase,
    DetailShopInfo,
    scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList
  }
};
</script>
<style  scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.d_navbar {
  position: relative;
  z-index: 10;
  background: #fff;
}
.d_scroll {
  height: calc(100% - 44px);
}
</style>