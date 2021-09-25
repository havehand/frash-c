<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"></van-icon>
      <van-search
          class="search-container"
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @input="input"
          @focus="focus"
          @blur="blur"
      />
      <div class="search-btn" @click="handleBtnSearch" v-if="!isCardShow">搜索</div>
      <van-icon name="cart-o"
                :badge="badge"
                id="shop-car"
                @click="$router.push({name: 'Shopping'})"
                v-else/>
    </div>
    <div class="like-search">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goodslist" v-if="goodsList.length > 0">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
      >
        <GoodsCord v-for="item in goodsList" :key="item.id" v-bind="item" :num="counterMap[item.id]"></GoodsCord>
      </van-list>
    </div>
    <div class="history" v-if="likeList.length <= 0">
      <MyHistory :searchList="searchPastList" @search="onSearch"></MyHistory>
    </div>
  </div>
</template>

<script>
import GoodsCord from "@/components/GoodsCord";
import MyHistory from "@/components/MyHistory";
import api from "@/api/index"
export default {
  name: "Search",
  components: {
    GoodsCord,
    MyHistory
  },
  data(){
    return{
      value: "",
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      total: 0,
      isCardShow: false,
      searchPastList: []
    }
  },
  computed: {
    counterMap(){
      return this.$store.state.counterMap;
    },
    badge(){
      const count = Object.values(this.counterMap).reduce((prev, next)=>prev + next, 0);
      if (count >= 100){
        return '99+'
      }
      return count
    }
  },
  methods:{
    handleBtnSearch(){
      if (this.value === ''){
        console.log('这里触发了');
        return;
      }
      this.page = 1;
      console.log('触发了');
      this.onLoad();
      this.isCardShow = true;
      clearTimeout(this.timer);
    },
    onLoad(){
      clearTimeout(this.timer);
      this.goodsList = [];
      this.likeList = [];
      const result = this.searchPastList.find((item)=>item.value === this.value);
      if (result){
        for (let item of this.searchPastList){
          if (item.value === this.value){
            item.time = new Date().getTime();
            break;
          }
        }
        this.searchPastList.sort((a,b)=>b.time - a.time)
      }else {
        this.searchPastList.unshift({value: this.value, time: new Date().getTime()})
        if (this.searchPastList.length >= 10){
          this.searchPastList.pop();
        }
      }
      localStorage.setItem('searchPastList',JSON.stringify(this.searchPastList));
      api.search({
        type: this.value,
        page: this.page,
        size: this.size
      }).then((res)=>{
        console.log(res);
        for (let item of res.data.list){
          this.goodsList.push(item);
        }
        this.total = res.data.total;
        if (this.total === 0){
          this.finished = true;
          return;
        }
        if (this.goodsList.length >= this.total){
          this.finished = true
        }else {
          this.page += 1;
        }
        this.loading = false;
      })
    },
    onSearch(value) {
      if (value === ''){
        return;
      }
      this.value = value;
      this.page = 1;
      this.finished = false;
      this.onLoad();
    },
    async input(){
      if (this.value === ''){
        this.likeList = [];
        return;
      }
      this.goodsList = [];
      if (this.timer){
        clearTimeout(this.timer)
        this.timer = null;
      }else {
        this.timer = setTimeout(async()=>{
          await api.likeSearch({
            likeValue: this.value
          }).then((res)=>{
            this.likeList = res.data.result;
          });
          clearTimeout(this.timer)
          this.timer = null;
        }, 300)
      }
    },
    focus(){
      this.isCardShow = false;
    },
    blur(){
      if (this.goodsList.length > 0){
        this.isCardShow = true;
      }
    },
    formatHTML(item){
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    }
  },
  created() {
    this.searchPastList = JSON.parse(localStorage.getItem('searchPastList')) || [];
  }
}
</script>

<style scoped lang="less">
  .search-wrapper{
    width: 100%;
    height: 100vh;
    z-index: 11;
    background-color: #fff;
    .search-head{
      width: 345px;
      background-color: #fff;
      margin: 0 auto;
      display: flex;
      align-items: center;
      position: fixed;
      top: 0;
      left: 15px;
      .search-container{
        flex: 1;
      }
      .search-btn{
        width: 45px;
        height: 35px;
        font-size: 14px;
        border: 1px solid cornflowerblue;
        color: cornflowerblue;
        text-align: center;
        line-height: 35px;
        border-radius: 15px;
      }
      #shop-car{
        font-size: 15px;
      }
    }
    .like-search{
      position: relative;
      top: 50px;
      width: 100%;
      box-sizing: border-box;
      padding-left: 20px;
    }
    .goodslist{
      position: relative;
      width: 345px;
      margin: 48px auto ;
      z-index: 12;
      background-color: #fff;
    }
    .history{
      width: 350px;
      position: absolute;
      top: 35px;
      left: 10px;
    }
  }
</style>