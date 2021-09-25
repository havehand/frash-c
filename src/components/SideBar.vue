<template>
  <div class="sidebar-wrapper" ref="sideWrapper">
    <div class="sidebar-item" v-for="(item, i) in this.$store.state.sideList" :key="item" :class="{active: i === index}" @click="handleClick(i, item, $event)">
      {{i === 0? '全部': item}}
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data(){
    return{
      index: 0,
    }
  },
  methods: {
    handleClick(i, item, e) {
      this.index = i;
      console.log(1);
      this.$store.commit('setGoodsList', item);
      this.$store.commit('resetGoodsList');
      const sideWrapper = this.$refs.sideWrapper;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = sideWrapper.getBoundingClientRect().top;
      const pHeight = sideWrapper.offsetHeight;
      sideWrapper.scrollTop += sonTop + sonHeight / 2 - pTop - pHeight / 2;
      this.$emit('listLoad');
    },
    resetIndex(){
      this.index = 0;
    }
  }
}
</script>

<style scoped lang="less">
  .sidebar-wrapper{
    position: fixed;
    left: 0;
    width: 79px;
    top: 148px;
    bottom: 50px;
    overflow: auto;
    background-color: #f8f8f8;
    scroll-behavior: smooth;
    div{
      width: 79px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      position: relative;
    }
    .active{
      font-weight: bold;
      color: #ff1a90;
      background-color: #e1e1e1;
    }
    .active::before{
      position: absolute;
      width: 6px;
      height: 18px;
      background-color: #ff1a90;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      content: '';
    }
  }
  .sidebar-wrapper::-webkit-scrollbar{
    background: none;
    width: 0;
  }
</style>