<template>
  <div class="Recruitment_container">
    <div v-if="recuritInfo !== []">
      <el-descriptions
        class="recurit_style"
        v-for="recurit in this.recuritInfo"
        :key="recurit.id"
        :title="recurit.title"
        :column="3"
      >
        <el-descriptions-item label="招聘开始时间">{{
          recurit.createTime
        }}</el-descriptions-item>
        <el-descriptions-item label="薪资">{{
          recurit.salary
        }}</el-descriptions-item>
        <el-descriptions-item label="要求">{{
          recurit.required
        }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{
          recurit.contacts
        }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{
          recurit.contactInfo
        }}</el-descriptions-item>
        <el-descriptions-item label="公司">
          {{ recurit.company }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-empty description="暂无招聘信息" v-if="!recuritInfo[0]"></el-empty>

    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script>
import { reqRecruitShow } from "@/api";
export default {
  name: "",
  data() {
    return {
      recuritInfo: [
      ],
      total: 10,
      currentPage: 1, //初始页
      pagesize: 3, //每页的数据
    };
  },
  mounted() {
    this.recruitShow();
    this.$bus.$on("recruitShow", this.recruitShow);
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.recruitShow();
    },
    async recruitShow() {
      let result = await reqRecruitShow({
        current: this.currentPage,
        size: this.pagesize,
      });
      if (result.code === 0) {
        this.recuritInfo = result.data.records;
        this.total = result.data.total;
        this.pagesize = result.data.size;
      }
    },
  },
};
</script>


<style lang="less" scoped>
.tagRight {
  margin-right: 5px;
}
.block {
  width: 4.375rem;
  margin: auto;
}
.recurit_style {
  margin: 10px;
}

</style>

