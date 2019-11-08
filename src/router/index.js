import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);
const Home =()=>import('../views/home/home');
const Cart =()=>import('../views/cart/cart');
const Category =()=>import('../views/category/category');
const Profile =()=>import('../views/profile/profile');
const routes = [
  {
    path:'',
    redirect:'/home'
  }, {
    path:'/home',
    component:Home
  },{
    path:'/cart',
    component:Cart
  },{
    path:'/category',
    component:Category
  },{
    path:'/profile',
    component:Profile
  }
]
const router = new vueRouter({
  routes,
  mode:'history'
})
export default router;
