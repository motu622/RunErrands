<template>
  <div class="runLeg_container">
    <el-form ref="form" label-width="80px" :model="takeForm">
      <el-form-item
        label="标题"
        prop="title"
        :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]"
      >
        <el-input v-model="takeForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item
        label="工资"
        prop="salary"
        :rules="[
          { required: true, message: '请输入工资', trigger: 'blur' },
          { type: 'number', message: '只允许输入数字', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model.number="takeForm.salary"
          placeholder="工资/天"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="required"
        label="要求"
        :rules="[{ required: true, message: '请输入要求', trigger: 'blur' }]"
      >
        <el-input v-model="takeForm.required" placeholder="要求"></el-input>
      </el-form-item>
      <el-form-item
        prop="contacts"
        label="联系人"
        :rules="[{ required: true, message: '请输入联系人', trigger: 'blur' }]"
      >
        <el-input v-model="takeForm.contacts" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="contactInfo"
        :rules="[
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { type: 'number', message: '只允许输入数字', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model.number="takeForm.contactInfo"
          placeholder="联系方式"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="公司"
        prop="company"
        :rules="[{ required: true, message: '请输入公司', trigger: 'blur' }]"
      >
        <el-input v-model="takeForm.company" placeholder="公司"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addRecruitment">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { reqRecruitAdd } from "@/api";
export default {
  name: "",
  data() {
    return {
      takeForm: {
        title: "",
        salary: "",
        required: "",
        contacts: "",
        contactInfo: "",
        company: "",
      },
      money: "",
    };
  },
  computed: {
    takeFormCopy() {
      let demo = JSON.parse(JSON.stringify(this.takeForm));
      demo.salary = demo.salary + "元/天";
      return demo;
    },
  },
  methods: {
    async addRecruitment() {
      let { title, salary, required, contacts, company } = this.takeForm;
      let pattContactInfo =
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!pattContactInfo.test(this.takeForm.contactInfo)) {
        this.$message({
          type: "error",
          message: "请输入正确的联系方式",
        });
      } else if (
        title !== "" &&
        salary !== "" &&
        required !== "" &&
        contacts !== "" &&
        company !== ""
      ) {
        let result = await reqRecruitAdd(this.takeFormCopy);

        if (result.code === 0) {
          this.$message({
            type: "success",
            message: "发布成功",
          });
          this.$bus.$emit("recruitShow");
          title = "";
          salary = "";
          required = "";
          contacts = "";
          contactInfo = "";
          company = "";
        }
      } else {
        this.$message({
          type: "warning",
          message: "请输入合适信息",
        });
      }
    },
  },
};
</script>


<style lang="less" scoped>
.runLeg_container {
  width: 1200px;
  margin: auto;
}
</style>

