<template>
  <div class="one-tab-wrapper" ref="oneTabWrapper">
    <div class="tab-item" v-for="(item,i) in menuList" :key="item.title" :class="{active: i === index}" @click="handleClick(i, $event)">
      <div class="img-wrapper">
        <img :src="item.imgURL" alt="">
      </div>
      <div class="tab-title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
function getMenuList(){
  const list = ['时令水果', '酒水冲调', '安心乳品', '休闲零食', '肉蛋食材', '新鲜食材', '熟食餐饮', '海鲜水产', '家用电器', '3C数码', '母婴用品', '鲜花绿植', '宠物用品', '图书文具', '手表配饰']
  const obj = []
  for (let i = 0; i < list.length; i++){
    obj.push({
      title: list[i],
      imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/'+list[i]+'.jpg'
    })
  }
  return obj;
}
export default {
  name: "OneTab",
  data(){
    return{
      index: 0,
      menuList: getMenuList()
    }
  },
  methods: {
    handleClick(i, e){
      this.index =  i;
      const oneTabWrapper = this.$refs.oneTabWrapper;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const wrapperWidth = oneTabWrapper.offsetWidth;
      oneTabWrapper.scrollLeft += itemWidth/2 + itemLeft - wrapperWidth / 2;
      this.$store.commit('setSideList', this.menuList[i].title);
      this.$store.commit('resetGoodsList');
      this.$emit('reload');
    },
  },
  mounted() {
    this.$store.commit('setSideList', this.menuList[0].title);
  }
}
</script>

<style scoped lang="less">
  .one-tab-wrapper{
    width: 375px;
    height: 104px;
    display: flex;
    overflow: auto;
    scroll-behavior: smooth;
    .tab-item{
      width: 50px;
      height: 70px;
      padding: 10px 5px;
      .img-wrapper{
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid transparent;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
          align-self: center;
        }
      }
      .tab-title{
        text-align: center;
        font-size: 12px;
        margin-top: 5px;
      }
      &.active{
        .img-wrapper{
          border: 2px solid #d13193;
          border-radius: 23px;
        }
        .tab-title{
          color: #fff;
          background-color: #d13193;
          font-weight: bold;
          border-radius: 30px;
        }
      }
    }
  }
  .one-tab-wrapper::-webkit-scrollbar{
    width: 0;
    background: none;
  }
</style>