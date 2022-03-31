<template>
  <div class="AccountManageContainer">
    <Header></Header>
    <el-row style="min-width: 800px">
      <el-col :span="24">
        <div class="title">账号管理</div>
        <el-form ref="form" :model="form" label-width="80px" class="personInfo">
          <el-form-item label="昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="校区">
            <el-input v-model="form.campus"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="form.university"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.classId"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="passwd">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.originalPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="submit_btn">
            <el-button type="primary" @click="checkPassWord">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
import {
  reqPasswordCheck,
  reqUserInfo,
  reqUserUpdate,
  reqPasswordUpdate,
} from "@/api";
export default {
  name: "",

  data() {
    return {
      form: {
        nickName: "",
        username: "",
        email: "",
        major: "",
        campus: "",
        university: "",
        classId: "",
      },
      ruleForm: {
        password: "",
        originalPass: "",
        checkPass: "",
      },
    };
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    async getUserInfo() {
      let result = await reqUserInfo();
      if (result.code === 0) {
        this.form = result.data;
        delete this.form.points;
      }
    },
    resetForm() {
      this.getUserInfo();
      this.ruleForm.password = "";
      this.ruleForm.originalPass = "";
      this.ruleForm.checkPass = "";
    },
    async checkPassWord() {
      if (this.ruleForm.password !== "") {
        if (this.ruleForm.originalPass === this.ruleForm.checkPass) {
          let result = await reqPasswordCheck({
            password: this.ruleForm.password,
          });
          if (result.code === 0) {
            let result2 = await reqPasswordUpdate({
              password: this.ruleForm.originalPass,
            });
            if (result2.code === 0) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "请输入正确的密码",
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "两次密码输入不一致",
          });
        }
      } else {
        let result3 = await reqUserUpdate(this.form);
        if (result3.code === 0) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  width: 1.25rem;
  min-width: 50px;
  height: 1.25rem;
  min-height: 50px;
  line-height: 100px;
  font-weight: 800;
  font-size: 0.3125rem;
  margin: 20px auto;
}
.personInfo {
  margin: 20px 6.5rem 0 6.25rem;
}
.demo-ruleForm {
  margin: 0.25rem 6.5rem 0 6rem;
}
.submit_btn {
  width: 300px;
  margin: 0 auto;
}
.AccountManageContainer .personInfo_container {
  width: 24rem;
  min-width: 10rem;
}
</style>