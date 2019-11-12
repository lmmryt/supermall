import { debounce } from "common/utils";
export const itemListenerMixin = {
  data() {
    return {
      homeImgLoad: null 
    }
  
  },
  mounted(){
    // 监听图片加载完成
    // 事件总线
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.homeImgLoad = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.homeImgLoad);
    // console.log("我是混入中的");
  }
 
  
}