<!--  -->
<template>
  <div id="home">
    <nav-bar class="homenav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <recommend-view :recommends='recommends'></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles='["流行","新款","精选"]'
                 class="tabControl"
                 @tabclick="tabclick"></tab-control>
    <goods-list :goods='showGoods'></goods-list>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 没有用default导出 所以需要大括号导入
import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "home",
  computed:{
    showGoods(){
      return this.goods[this.currentStatus].list
    }
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentStatus: "pop"
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  // 当组件一旦创建就会执行的函数
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 网络请求
    // 代码组织
    // 为了防止created中的代码过多，在methods中多包装一层，在created中调用，注意加this
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 请求过来的数据要在data里存一下
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // push

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
        // console.log(res.data.list);
      });
    },
    // 事件监听
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentStatus = "pop";
          break;
        case 1:
          this.currentStatus = "new";
          break;
        case 2:
          this.currentStatus = "sell";
      }
    }
  }
};

// 不用原生滚动
</script>
<style  scoped>
#home {
  padding-top: 44px;
}
.homenav {
  background: var(--color-tint);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.tabControl {
  /* 会实现吸顶效果，必须加一个top属性 */
  position: sticky;
  top: 44px;
  z-index: 99;
}
</style>

