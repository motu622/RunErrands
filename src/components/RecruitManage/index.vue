<template>
  <div class="RecruitManage_container">
    <el-table
      :data="RecruitInfo"
      border
      style="width: 100%"
      @cell-dblclick="tableDbEdit"
    >
      <el-table-column property="id" label="编号" width="180">
      </el-table-column>
      <el-table-column property="title" label="岗位"> </el-table-column>
      <el-table-column property="createTime" label="招聘开始时间">
      </el-table-column>
      <el-table-column property="salary" label="薪资"> </el-table-column>
      <el-table-column property="required" label="要求"> </el-table-column>
      <el-table-column property="contacts" label="联系人"> </el-table-column>
      <el-table-column property="contactInfo" label="联系电话">
      </el-table-column>
      <el-table-column property="company" label="公司"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="RecruitUpdate(scope.row)"
            >修改</el-button
          >
          <el-button size="mini" type="text" @click="RecruitDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
</template>

<script>
import { reqRecruitShow, reqRecruitDel, reqRecruitUpdate } from "@/api";
export default {
  data() {
    return {
      RecruitInfo: [],
      total: 10,
      currentPage: 1, //初始页
      pagesize: 5, //每页的数据
    };
  },
  methods: {
    tableDbEdit(row, column, cell, event) {
      if (column.label != "编号" && column.label != "操作") {
        let cellInput = document.createElement("input");
        cellInput.value = event.target.innerText;
        event.target.innerHTML = "";

        cellInput.setAttribute("type", "text");
        cellInput.style.width = "80%";
        cell.appendChild(cellInput);
        cellInput.onblur = function () {
          cell.removeChild(cellInput);
          event.target.innerHTML = cellInput.value;
        };
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getRecruitInfo();
    },
    async getRecruitInfo() {
      let result = await reqRecruitShow({
        current: this.currentPage,
        size: this.pagesize,
      });
      if (result.code === 0) {
        this.RecruitInfo = result.data.records;
        this.pagesize = result.data.size;
        this.total = result.data.total;
      }
    },
    async RecruitDel(id) {
      let result = await reqRecruitDel({ id });
      if (result.code === 0) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getRecruitInfo();
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }
    },
    async RecruitUpdate(recruitInfo) {
      let result = await reqRecruitUpdate(recruitInfo);
      if (result.code === 0) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.getRecruitInfo();
      }
    },
  },
  mounted() {
    this.getRecruitInfo();
  },
};
</script>

<style scoped>
.RecruitManage_container {
  width: 1400px;
  margin: 50px auto;
}
.block {
  width: 350px;
  margin: auto;
}
</style>

