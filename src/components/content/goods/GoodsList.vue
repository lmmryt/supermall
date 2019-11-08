<!--  -->
<template>
  <div  class="goods">
   <goods-item v-for="item in goods" :goods-item='item'>
     {{item}}
   </goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'
export default {
 name: 'GoodsList',
 components:{
   GoodsItem
 },
 props:{
   goods:{
     type:Array,
     default(){
       return []
     }
   }
 },
  data () {
    return {
    };
  },

}

</script>
<style  scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;   
}

</style>