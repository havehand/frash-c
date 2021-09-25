<template>
  <div class="shopping">
    <div class="top-nav">
      <van-nav-bar
          title="购物车"
          right-text="删除"
          @click-right="del"
      />
    </div>
    <div class="card-list">
      <van-checkbox-group ref="checkboxGroup" v-model="result">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <GoodsCard v-bind="item" :num="counterMap[item.id]" :nofly="true"></GoodsCard>
        </div>
      </van-checkbox-group>
    </div>
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import api from "@/api/index"
import GoodsCard from "@/components/GoodsCord"
import {Toast, Dialog} from "vant"
export default {
  name: "Shopping",
  components: {
    GoodsCard
  },
  data(){
    return{
      result: [],
      list: [],
      checked: false
    }
  },
  watch:{
    result(){
      this.checked = this.result.length === this.list.length;
    }
  },
  methods: {
    async del(){
      if (this.result.length === 0){
        Toast('你没有选中任何商品');
        return;
      }
      try{
        await Dialog.confirm({message: '您是否要删除已经选中的商品'});
        this.result.forEach((id)=>{
          this.$store.commit('storageChange',{id, value: -Infinity});
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        })
      }catch (error){
        Toast('用户点击的取消');
      }
    },
    async getAllData(){
      console.log('运行了');
      const result = Object.keys(this.counterMap);
      await api.getGoodsByIds({
        value: result.join()
      }).then((res)=>{
        this.list = res.data.list;
      })
    },
    onSubmit(){

    },
    checkAll(){
      if (this.checked){
        this.$refs.checkboxGroup.toggleAll(true);
      }else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    }
  },
  computed:{
    counterMap(){
      return this.$store.state.counterMap
    },
    allMoney(){
      const resArr = this.list.filter((item)=> this.result.includes(item.id));
      return resArr.reduce((prev, next)=>{
        const num = this.counterMap[next.id] || 0
        return Math.round(num * next.price * 100) + prev;
      }, 0)
    },
    totalNum(){
      const resArr = this.list.filter((item)=> this.result.includes(item.id));
      return resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);
    }
  },
  created() {
    this.getAllData();
  }
}
</script>

<style scoped lang="less">
  .shopping{
    background-color: #fff;
    min-height: 100vh;
    .top-nav{
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10;
    }
    .card-list{
      width: 100%;
      position: absolute;
      top: 46px;
      z-index: 0;
      box-sizing: border-box;
      padding: 10px 10px 100px 10px;
      background-color: #fff;
      .card-box{
        display: flex;
        justify-content: center;
      }
      .check{
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
    .van-submit-bar{
      bottom: 50px;
    }
  }
</style>