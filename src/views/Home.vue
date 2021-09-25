<template>
  <div class="home">
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: "Home",
  components: {
    TabBar,
  }
}
</script>

<style scoped>

</style>