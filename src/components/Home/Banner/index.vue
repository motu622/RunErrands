<template>
  <el-row style="min-width: 800px">
    <el-col :span="24">
      <el-carousel :interval="4000" class="demo" type="card" height="3.75rem">
        <el-carousel-item
          v-for="(item, i) in bannerList"
          :key="i"
          :style="{
            backgroundImage: 'url(' + item.bannerImg + ')',
          }"
          style="background-size: 100% 100%"
        >
        </el-carousel-item> </el-carousel
    ></el-col>
  </el-row>
</template>


<script>
export default {
  data() {
    return {
      bannerList: [
        { bannerImg: "https://cdn.maixiaotai.top/banner_1.jpg" },
        { bannerImg: "https://cdn.maixiaotai.top/banner_2.jpg" },
        { bannerImg: "https://cdn.maixiaotai.top/banner_3.jpg" },
        { bannerImg: "https://cdn.maixiaotai.top/banner_4.jpg" },
      ],
    };
  },
};
</script>

<style>
@media screen and (max-width: 800px) {
  .el-carousel__container {
    height: 125px !important;
  }
}
</style>