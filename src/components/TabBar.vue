<template>
  <van-tabbar fixed v-model="active" route>
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o"
                     to="/home/shopping"
                     :badge="badge"
                     id="shop-car"
    >购物车</van-tabbar-item>
    <van-tabbar-item icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "TabBar",
  data() {
    return {
      active: 0,
    };
  },
  computed:{
    counterMap(){
      return this.$store.state.counterMap
    },
    badge(){
      const count = Object.values(this.counterMap).reduce((prev, next)=>prev + next, 0);
      if (count >= 100){
        return '99+'
      }
      return count
    }
  }
}
</script>

<style scoped>

</style>