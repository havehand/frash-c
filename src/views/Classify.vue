<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" tag="div" :to="{name: 'Search'}">
      <van-icon name="search"></van-icon>
      <div>苹果特卖1元1斤</div>
    </router-link>
    <OneTab @reload="handleReload"></OneTab>
    <div v-show="showContent">
      <side-bar ref="sideBar" @listLoad="handleListLoad"></side-bar>
      <GoodsList ref="goodsList"></GoodsList>
    </div>
    <van-loading size="2rem" vertical v-show="!showContent"></van-loading>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import OneTab from "@/components/OneTab";
import GoodsList from "@/components/GoodsList";
// import api from "@/api/index"
export default {
  name: "Classify",
  data(){
    return{
      showContent: true
    }
  },
  components: {
    OneTab,
    SideBar,
    GoodsList
  },
  methods:{
    handleListLoad(){
      this.$refs.goodsList.changeFinished(false);
      this.$store.commit('resetGoodsList');
      if (this.$store.state.goodsList.length === this.$store.state.goodsListTotal){
        console.log('执行了');
        this.$refs.goodsList.changeFinished(true);
      }
    },
    handleReload(){
      this.$refs.sideBar.resetIndex();
    }
  }
}
</script>

<style scoped lang="less">
  .classify-wrapper{
    width: 375px;
    .search-btn{
      width: 355px;
      height: 33px;
      background-color: #eee;
      margin: 11px auto;
      border-radius: 10px;
      line-height: 33px;
      font-size: 14px;
      text-align: center;
      >*{
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>