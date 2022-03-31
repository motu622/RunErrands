<template>
  <el-row>
    <el-col :span="24"
      ><el-tabs class="main_content" style="height: 200px">
        <el-tab-pane label="招聘">
          <Recruitment></Recruitment>
        </el-tab-pane>
        <el-tab-pane label="招聘发布" v-if="this.$store.state.user.isAdmin">
          <AddRecruitment></AddRecruitment>
        </el-tab-pane>
        <el-tab-pane label="跑腿接单">
          <TakeOrder :orderType="1"></TakeOrder>
        </el-tab-pane>
        <el-tab-pane label="跑腿发布">
          <AddOrder :type="1"></AddOrder>
        </el-tab-pane>
        <el-tab-pane label="公益接单">
          <TakeOrder :orderType="2"></TakeOrder>
        </el-tab-pane>
        <el-tab-pane label="公益发布" v-if="this.$store.state.user.isAdmin">
          <AddOrder :type="2"></AddOrder>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>


<script>
import Recruitment from "./Recruitment";
import AddRecruitment from "./AddRecruitment";
import AddOrder from "../../AddOrder";
import TakeOrder from "../../TakeOrder";
export default {
  name: "",

  components: {
    Recruitment,
    AddOrder,
    TakeOrder,
    AddRecruitment,
  },
};
</script>


<style lang="less" scoped>
.main_content {
  height: auto !important;
  width: 18.75rem;
  min-width: 800px;
  margin: 20px auto;

  .el-tab-pane {
    padding: 5px 30px;
    border-radius: 8px;
    background: #fff;
  }
}
</style>

