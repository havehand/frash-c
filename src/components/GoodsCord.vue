<template>
  <div class="card-wrapper van-hairline--bottom">
    <div class="card-img">
      <img :src="images[0]" alt="" ref="img">
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{title}}</div>
      <div class="desc overflow-hidden">{{desc}}</div>
      <div class="tags">
        <div v-for="item in tags" :key="item">
          {{item}}
        </div>
      </div>
      <div class="prices">￥{{price}}</div>
      <div class="counter">
        <div @click="changeGoodNum(id, -1)" v-if="num"><img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" alt=""></div>
        <div class="num" v-if="num">{{num}}</div>
        <div @click="changeGoodNum(id, 1)"><img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import Animate from "@/utils/index.js"
export default {
  name: "GoodsCord",
  props: ["images", 'tags', 'title', 'price', 'desc', 'id', 'num', 'nofly'],
  methods: {
    changeGoodNum(id, num){
      this.$store.commit('storageChange', {id, value: num});
      if (this.nofly){
        return;
      }
      const {top, left} = this.$refs.img.getBoundingClientRect();
      const {offsetWidth: imgWidth, offsetHeight: imgHeight} = this.$refs.img;
      const shopCar = document.getElementById('shop-car');
      const {left: carX, top: carY} = shopCar.getBoundingClientRect();
      const {offsetWidth: carWidth, offsetHeight: carHeight} = shopCar;
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      if (num === -1){
        return;
      }
      Animate({
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width: imgWidth,
        height: imgHeight
      })
    }
  },
}
</script>

<style scoped lang="less">
  .card-wrapper{
    width: 100%;
    display: flex;
    height: 100px;
    .card-img{
      width: 90px;
      margin: 0 20px;
      img{
        width: 90px;
        height: 90px;
      }
    }
    .card-content{
      flex: 1;
      position: relative;
      >div {
        width: 170px;
      }
      .title {
        font-size: 13px;
        color: #1a1a1a;
        margin-top: 5px;
      }
      .desc{
        color: #aaa;
        font-size: 11px;
        margin-top: 5px;
      }
      .tags{
        margin-top: 4px;
        div{
          display: inline-block;
          font-size: 10px;
          padding: 2px;
          border: 1px solid #aaa;
          color: #aaa;
          border-radius: 3px;
          margin-right: 5px;
        }
      }
      .prices{
        color: #ff1a90;
        font-size: 14px;
        font-weight: bold;
      }
      .counter{
        position: absolute;
        bottom: 12px;
        right: 5px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        >div:not(.num){
          width: 16px;
          height: 16px;
          img{
            width: 100%;
          }
        }
        .num{
          padding: 0 5px;
          height: 22px;
          line-height: 22px;
        }
      }
    }
  }
  .overflow-hidden{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>