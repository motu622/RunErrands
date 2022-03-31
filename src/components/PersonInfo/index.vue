<template>
  <el-row style="min-width: 800px">
    <el-col :span="24">
      <h1 class="title">我的信息</h1>
      <el-descriptions size="medium" :border="true" class="person" :column="1">
        <el-descriptions-item label="学号:">
          {{ userInfo.stuNum }}</el-descriptions-item
        >
        <el-descriptions-item label="昵称:">{{
          userInfo.nickName
        }}</el-descriptions-item>
        <el-descriptions-item label="姓名:">{{
          userInfo.username
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱:">{{
          userInfo.email
        }}</el-descriptions-item>
        <el-descriptions-item label="专业:">{{
          userInfo.major
        }}</el-descriptions-item>
        <el-descriptions-item label="学校:">{{
          userInfo.university
        }}</el-descriptions-item>
        <el-descriptions-item label="校区:">{{
          userInfo.campus
        }}</el-descriptions-item>
        <el-descriptions-item label="班级:">{{
          userInfo.classId
        }}</el-descriptions-item>
        <el-descriptions-item label="积分:">{{
          userInfo.points
        }}</el-descriptions-item>
      </el-descriptions>
    </el-col>
  </el-row>
</template>

<script>
import { reqUserInfo } from "@/api";
export default {
  name: "",

  data() {
    return {
      userInfo: {},
    };
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      let result = await reqUserInfo();
      if (result.code === 0) {
        this.userInfo = result.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 80px 0 20px 400px;
}
.el-descriptions {
  font-size: 20px;
}
.person {
  margin: 0 400px;
}

.userInfo_container {
  height: 800px;
}
</style>