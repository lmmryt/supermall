<!--  -->
<template>
  <div id="home">
    <nav-bar class="homenav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles='["流行","新款","精选"]'
                   class="tabControl"
                   @tabclick="tabclick"
                   ref='tabControl1'
                  v-show="isTabFixed"></tab-control>
    <scroll class='content'
            ref="scroll"
            :probe-type=3
            @scrollPosition="scrollPosition"
            :pullUpLoad='pullUpLoad'
            @pullingUp='loadmore'>
      <home-swiper :banners='banners'
                   @swiperImage='swiperImage'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles='["流行","新款","精选"]'
                   class="tabControl"
                   @tabclick="tabclick"
                   ref='tabControl2'
                  ></tab-control>
      <goods-list :goods='showGoods'></goods-list>
    </scroll>
    <!-- 组件不能直接监听@click事件 -->
    <back-top @click.native="backBtn"
              v-show='isShowBack'></back-top>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 没有用default导出 所以需要大括号导入
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "home",
  computed: {
    showGoods() {
      return this.goods[this.currentStatus].list;
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
      currentStatus: "pop",
      isShowBack: false,
      pullUpLoad: true,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    scroll,
    BackTop
  },
  // 当组件一旦创建就会执行的函数
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    // 回来时最好进行一次refresh
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
    
  },
  mounted() {
    // 监听图片加载完成
    // 事件总线
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    //

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
        this.$refs.scroll.finishPullUp();
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
      this.$refs.tabControl1.curIndex = index
      this.$refs.tabControl2.curIndex  = index
    },
    backBtn() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    scrollPosition(position) {
      // 1.判断backTop是否显示
      this.isShowBack = -position.y > 500

      // 2.决定tabControl是否吸顶
      this.isTabFixed = -position.y >this.tabOffsetTop
    },
    loadmore() {
      this.getHomeGoods(this.currentStatus);
    },
    swiperImage() {
      // 2.获取tabControl的offsetTop
      // 所有的组件都有一个属性 $el:用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};

// 不用原生滚动
</script>

<style  scoped>
/* scoped是作用域 */
#home {
  /* padding-top: 44px; */
  /* vh view  */
  height: 100vh;
  position: relative;
}
.homenav {
  background: var(--color-tint);
  color: #fff;
  /* 在浏览器原生滚动时，需要，现在需要的是better-scroll不对顶部产生影响 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}
.tabControl {
  /* 会实现吸顶效果，必须加一个top属性 */
  /* position: sticky;
  top: 44px;
  z-index: 99; */
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
.tabC{
  position: relative;
  z-index: 9;
}
/* .content{
  height:calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

</style>

