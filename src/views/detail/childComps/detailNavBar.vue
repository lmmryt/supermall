<!--  -->
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for='(item,index) of titles' class="item" @click="btn(index)" :class="{active: index === curIndex}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "detailNavBar",
  data() {
    return {
       titles:['商品','参数','评论','推荐'],
       curIndex:0
    };
  },
  methods:{
    btn(index){
      this.curIndex = index;      
    },
    backClick(){
      // this.$router.go(-1)
      this.$router.back()
    }
  },
  components:{
    NavBar
  }
};
</script>
<style  scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title .item{
  flex:1
}
.active{
  color: var(--color-tint)
}
.back{
  margin-top: 7px;
}
</style>