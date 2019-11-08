<!--  -->
<template>
  <div class="tabControl">
    <!-- 如果只是文字不一样，就没有必要搞插槽 -->
    <div v-for="(item,index) in titles" class="item" :class="{active:index === curIndex}" @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    tabClick(index){
      this.curIndex=index;
      this.$emit('tabclick',index)
    }
  },
  data() {
    return {
      curIndex:0
    };
  }
};
</script>
<style  scoped>
.tabControl{
  display: flex;
  text-align: center;
  font-size: 15px;
   height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tabControl .item{
  flex:1;
}
.active{
  color: var(--color-high-text);
  
}
.active span{
  border-bottom: 3px solid var(--color-tint);
  padding: 5px;
}
</style>