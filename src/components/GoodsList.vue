<template>
  <div class="list-wrapper">
    <div class="list-header van-hairline--top-bottom">
      <div @click="changeType('all')" :class="{active: type === 'all'}">综合</div>
      <div @click="changeType('sale')"  :class="{active: type === 'sale'}">销量</div>
      <div @click="changeSort(isUp)"  class="price" :class="{priceUp: type === 'price-up', priceDown: type === 'price-down'}">价格</div>
    </div>
    <div class="list-content">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <GoodsCord v-for="item in $store.state.goodsList" :key="item.id" v-bind="item" :num="counterMap[item.id]"></GoodsCord>
      </van-list>
    </div>
  </div>
</template>

<script>
import GoodsCord from "@/components/GoodsCord";
export default {
  name: "GoodsList",
  components: {
    GoodsCord
  },
  data(){
    return{
      type: 'all',
      isUp: true,
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods:{
    changeType(type){
      this.type = type;
      this.$store.commit('sortGoodsList', type);
      this.isUp = true;
    },
    changeSort(bool){
      if (bool){
        this.type = 'price-up';
        this.$store.commit('sortGoodsList', 'price-up');
        this.isUp = false;
      }else {
        this.$store.commit('sortGoodsList', 'price-down');
        this.type = 'price-down';
        this.isUp = true;
      }
    },
    async onLoad() {
      if (this.$store.state.goodsList.length > 0){
        setTimeout(()=>{
          if (this.$store.state.goodsList.length === this.$store.state.goodsListTotal){
            console.log('结束');
            this.finished = true;
            this.loading = false;
            return;
          }
          this.$store.commit('pullGoodsList');
          this.loading = false;
        },1000)
      }else {
        this.loading = false;
      }
    },
    changeFinished(bool){
      this.finished = bool;
    }
  },
  computed: {
    goodsList(){
      return this.$store.state.goodsList
    },
    counterMap(){
      return this.$store.state.counterMap;
    }
  }
}
</script>

<style scoped lang="less">
  .list-wrapper{
    .list-header{
      width: 299px;
      position: relative;
      top: 0;
      left: 76px;
      z-index: 10;
      box-sizing: border-box;
      padding-right: 8px;
      display: flex;
      justify-content: flex-end;
      div{
        width: 50px;
        height: 25px;
        text-align: center;
        color: #aaa;
        line-height: 25px;
      }
      .price{
        position: relative;
      }
      .active, .priceUp, .priceDown{
        color: #ff1a90;
        font-weight: bold;
      }
      .price::after{
        content: "";
        border: 4px solid transparent;
        border-top-color: #aaa;
        position: absolute;
        bottom: 4px;
        right: 0;
      }
      .price::before{
        content: "";
        border: 4px solid transparent;
        border-bottom-color: #aaa;
        position: absolute;
        top: 4px;
        right: 0;
      }
      .priceUp::before{
        border-bottom-color: #ff1a90;
      }
      .priceDown::after{
        border-top-color: #ff1a90;
      }
    }
    .list-content{
      width: 299px;
      position: fixed;
      top: 183px;
      left: 79px;
      height: 450px;
      overflow: auto;
    }
  }
</style>