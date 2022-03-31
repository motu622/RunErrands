<template>
  <div>
    <el-descriptions
      class="margin-top"
      :title="type === '跑腿' ? '跑腿订单' : '公益订单'"
      :column="4"
      border
      v-for="order in this.orderInfo"
      :key="order.id"
    >
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
          @click="orderRecive(order.id, order.sellerId)"
          >接单</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          订单编号
        </template>
        {{ order.sellerId }}
      </el-descriptions-item>
      <el-descriptions-item v-if="type === '跑腿'">
        <template slot="label">
          <i class="el-icon-user"></i>
          发单时间
        </template>
        {{ order.createTime }}
      </el-descriptions-item>
      <el-descriptions-item v-else>
        <template slot="label">
          <i class="el-icon-user"></i>
          剩余人数
        </template>
        {{ order.num }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          {{ type === "跑腿" ? "酬金" : "积分" }}
        </template>
        {{ order.price }}/次
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small" class="smallTag">{{ order.university }}</el-tag>
        <el-tag size="small" class="smallTag">{{ order.campus }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-set-up"></i>
          订单描述
        </template>
        {{ order.detail }}
      </el-descriptions-item>
    </el-descriptions>
    <el-empty description="无单可接" v-if="!orderInfo[0]"></el-empty>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>



<script>
import { reqOrderShow, reqOrderReceive } from "@/api";
export default {
  name: "",
  data() {
    return {
      orderInfo: [],
      total: 10,
      currentPage: 1, //初始页
      pagesize: 2, //每页的数据
      type: this.orderType === 1 ? "跑腿" : "公益", //订单类型
    };
  },
  props: ["orderType"],
  mounted() {
    this.OrderShow();
    this.$bus.$on("OrderShow", this.OrderShow);
  },
  computed: {
    OrderShowInfo() {
      return {
        current: this.currentPage,
        size: this.pagesize,
        type: this.type,
      };
    },
  },
  methods: {
    async OrderShow() {
      let result = await reqOrderShow(this.OrderShowInfo);
      if (result.code === 0) {
        this.orderInfo = result.data.records;
        this.total = result.data.total;
        this.pagesize = result.data.size;
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.OrderShow(this.OrderShowInfo);
    },
    async orderRecive(id, sellerId) {
      let result = await reqOrderReceive({ id, sellerId });
      if (result.code === 0) {
        this.$message({
          type: "success",
          message: "接单成功",
        });
        this.OrderShow();
      } else if (result.code === 1) {
        this.$message({
          type: "warning",
          message: "不能接自己发布的订单",
        });
      } else {
        this.$message({
          type: "error",
          message: "接单失败",
        });
      }
    },
  },
};
</script>


<style lang="less" scoped>
.smallTag {
  margin-right: 5px;
}
.block {
  width: 350px;
  margin: auto;
}
</style>

