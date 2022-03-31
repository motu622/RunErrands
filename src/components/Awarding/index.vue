<template>
  <div class="Awarding_container">
    <div v-if="goodsShowInfo[0]">
      <el-row class="main">
        <el-col
          class="total"
          v-for="goodsShow in this.goodsShowInfo"
          :key="goodsShow.id"
        >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="goodsShow.img" class="image" />
            <div style="padding: 14px">
              <span>{{ goodsShow.goodName }}</span>
              <div class="bottom clearfix">
                <small>{{ goodsShow.points }}</small>
                <span>积分 </span>
                <em> 剩余数量 </em>
                <i>{{ goodsShow.num }}</i>
                <el-button
                  type="text"
                  class="button"
                  @click="goodsExchange(goodsShow.id)"
                  >兑换</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-empty description="暂无物品兑换" v-if="!goodsShowInfo[0]"></el-empty>
  </div>
</template>

<script>
import { reqGoodsExchange, reqGoodsShow, reqRecruitAdd } from "@/api";
export default {
  name: "",
  data() {
    return {
      goodsShowInfo: [
        
      ],
      total: 10,
      currentPage: 1, //初始页
      pagesize: 8, //每页的数据
    };
  },
  mounted() {
    this.GoodsShow();
  },
  computed: {
    goodsInfo() {
      return {
        current: this.currentPage,
        size: this.pagesize,
        type: "奖品",
      };
    },
  },
  methods: {
    async GoodsShow() {
      let result = await reqGoodsShow(this.goodsInfo);
      if (result.code === 0) {
        this.goodsShowInfo = result.data.records;
        this.pagesize = result.data.size;
        this.total = result.data.total;
      } else {
        this.$message({
          type: "error",
          message: "获取信息失败",
        });
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.GoodsShow();
    },
    async goodsExchange(id) {
      let result = await reqGoodsExchange({ id });
      if (result.code === 0) {
        this.$message({
          type: "success",
          message: "兑换成功",
        });
        this.GoodsShow();
      } else {
        this.$message({
          type: "error",
          message: "兑换失败",
        });
      }
    },
  },
};
</script>


<style lang="less" scoped>
.Awarding_container {
  width: 980px;
  margin: 50px auto;
  .total {
    margin-left: 60px;
    height: 300px;
    width: 200px;
    .bottom {
      margin-top: 13px;
      line-height: 12px;
      .button {
        padding: 0;
        float: right;
      }
    }
    .image {
      width: 100%;
      display: block;
      width: 200px;
      height: 200px;
    }
  }
  .total:nth-child(4n + 1) {
    margin-left: 0;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.block {
  width: 350px;
  margin: auto;
}
</style>

