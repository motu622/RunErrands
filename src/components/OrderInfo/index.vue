<template>
  <el-row style="min-width: 800px" class="merchantOrderManage">
    <el-col :span="24">
      <div class="runErrands" v-if="runErrandsInfo[0]">
        <div class="title">跑腿接单</div>

        <div class="orderInfo">
          <el-table :data="runErrandsInfo" border style="margin: 20px auto">
            <el-table-column
              prop="id"
              label="订单号"
              width="140"
              align="center"
              fixed
            >
            </el-table-column>
            <el-table-column
              prop="detail"
              label="订单内容"
              width="420"
              align="center"
              fixed
            >
            </el-table-column>

            <el-table-column
              prop="price"
              label="酬劳(元)"
              align="center"
              width="90"
            >
            </el-table-column>

            <el-table-column
              prop="university"
              label="学校"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="campus"
              label="校区"
              align="center"
              width="115"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="下单时间"
              align="center"
              width="160"
            ></el-table-column>
            <el-table-column
              label="订单状态"
              align="center"
              width="80"
              prop="done,buyerId"
            >
              <template slot-scope="scope">
                <div class="tip-tag">
                  <el-tag
                    type="info"
                    v-if="scope.row.done === '0' && scope.row.buyerId !== ''"
                    >待完成</el-tag
                  >
                  <el-tag type="success" v-else-if="scope.row.done === '1'"
                    >已完成</el-tag
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="140">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="completeForm(scope.row.id, scope.row.sellerId)"
                  size="mini"
                  v-if="scope.row.done !== '1'"
                  >完成接单</el-button
                >
                <el-button
                  type="text"
                  @click="deleteForm(scope.row.id)"
                  size="mini"
                  v-if="scope.row.done !== '1'"
                  >取消接单</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :page-size="pagesize1"
            layout="total, prev, pager, next, jumper"
            :total="total1"
          >
          </el-pagination>
        </div>
      </div>
      <div class="publicWelfare" v-if="publicWelfareInfo[0]">
        <div class="title">公益接单</div>
        <div class="orderInfo">
          <el-table :data="publicWelfareInfo" border style="margin: 20px auto">
            <el-table-column
              prop="id"
              label="订单号"
              width="140"
              align="center"
              fixed
            >
            </el-table-column>
            <el-table-column
              prop="detail"
              label="订单内容"
              width="420"
              align="center"
              fixed
            >
            </el-table-column>

            <el-table-column
              prop="price"
              label="积分"
              align="center"
              width="90"
            >
            </el-table-column>

            <el-table-column
              prop="university"
              label="学校"
              align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="campus"
              label="校区"
              align="center"
              width="115"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="下单时间"
              align="center"
              width="160"
            ></el-table-column>
            <el-table-column
              label="订单状态"
              align="center"
              width="80"
              prop="done,buyerId"
            >
              <template slot-scope="scope">
                <div class="tip-tag">
                  <el-tag type="info" v-if="scope.row.done === '0'"
                    >待完成</el-tag
                  >
                  <el-tag type="success" v-else-if="scope.row.done === '1'"
                    >已完成</el-tag
                  >
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="140">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="completeForm(scope.row.id, scope.row.sellerId)"
                  size="mini"
                  v-if="scope.row.done !== '1'"
                  >完成订单</el-button
                >
                <el-button
                  type="text"
                  @click="deleteForm(scope.row.id)"
                  size="mini"
                  v-if="scope.row.done !== '1'"
                  >取消接单</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page="currentPage2"
            :page-size="pagesize2"
            layout="total, prev, pager, next, jumper"
            :total="total2"
          >
          </el-pagination>
        </div>
      </div>

      <el-empty
        description="暂无订单"
        v-if="!runErrandsInfo[0] && !publicWelfareInfo[0]"
      ></el-empty>
    </el-col>
  </el-row>
</template>

<script>
import { reqOrderDone, reqOrderPay, reqOrderCancel } from "@/api";
export default {
  name: "",
  data() {
    return {
      runErrandsInfo: [],
      publicWelfareInfo: [],
      total1: 10,
      total2: 10,
      currentPage1: 1, //初始页
      pagesize1: 2, //每页的数据
      currentPage2: 1, //初始页
      pagesize2: 2, //每页的数据
      dynamic: "", //验证码
    };
  },
  computed: {
    runErrandsMsg() {
      return {
        current: this.currentPage1,
        size: this.pagesize1,
        type: "跑腿",
      };
    },
    publicWelfareMsg() {
      return {
        current: this.currentPage2,
        size: this.pagesize2,
        type: "公益",
      };
    },
  },
  mounted() {
    this.getRunErrandPush();
    this.getPublicWelfarePush();
  },
  methods: {
    //    完成订单
    completeForm(id, sellerId) {
      this.$prompt("请输入验证码", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
      })
        .then(async ({ value }) => {
          let result = await reqOrderPay({
            id,
            sellerId,
            dynamic: value,
          });
          if (result.code === 0) {
            this.getRunErrandPush();
            this.getPublicWelfarePush();
            this.$message({
              type: "success",
              message: "接单已完成",
            });
          } else {
            this.$message({
              type: "error",
              message: "验证码错误",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //    取消接单
    deleteForm(id) {
      this.$confirm("是否取消该接单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await reqOrderCancel({
            id,
          });
          if (result.code === 0) {
            this.getRunErrandPush(this.runErrandsMsg);
            this.getPublicWelfarePush(this.publicWelfareMsg);
            this.$message({
              type: "success",
              message: "取消成功!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
        });
    },
    // 获取跑腿订单
    async getRunErrandPush() {
      let result = await reqOrderDone(this.runErrandsMsg);
      if (result.code === 0) {
        this.runErrandsInfo = result.data.records;
        this.pagesize1 = result.data.size;
        this.total1 = result.data.total;
      }
    },
    handleCurrentChange1(currentPage) {
      this.currentPage1 = currentPage;
      this.getRunErrandPush();
    },
    // 获取公益订单
    async getPublicWelfarePush() {
      let result = await reqOrderDone(this.publicWelfareMsg);
      if (result.code === 0) {
        this.publicWelfareInfo = result.data.records;
        this.pagesize2 = result.data.size;
        this.total2 = result.data.total;
      }
    },
    handleCurrentChange2(currentPage) {
      this.currentPage2 = currentPage;
      this.getPublicWelfarePush();
    },

    tableRowClassName({ row, rowIndex }) {
      let arr = this.hoverOrderArr;
      for (let i = 0; i < arr.length; i++) {
        if (rowIndex == arr[i]) {
          return "hovered-row";
        }
      }
    },
  },
};
</script>


<style lang="less" scoped>
.merchantOrderManage {
  background: #fff;
  width: 24rem;
  min-width: 800px;
  left: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem;
  margin: 0 auto;
  box-shadow: 0 0.025rem 0.15rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.05rem;
}


.block {
  width: 350px;
  margin: auto;
}
.orderInfo {
  width: 1256px;
  background-color: #9e9e9e;
  margin: auto;
}
.title {
  width: 200px;
  height: 50px;
  font-size: 25px;
  line-height: 50px;
  text-align: center;
  margin: 0 auto;
}
.inputWidth {
  width: 80px;
}
</style>

