<template>
  <div class="register-container">
    <el-form :model="user" ref="form" label-width="50px">
      <el-form-item
        label="学号"
        prop="stuNum"
        :rules="[
          { required: true, message: '请输入学号', trigger: 'blur' },
          { type: 'number', message: '学号必须为数字' },
        ]"
      >
        <el-input v-model.number="user.stuNum" placeholder="学号"></el-input>
      </el-form-item>
      <el-form-item
        prop="nickName"
        label="昵称"
        :rules="[
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { max: 16, message: '请输入合理长度', trigger: 'blur' },
        ]"
      >
        <el-input v-model="user.nickName" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item
        prop="username"
        label="姓名"
        :rules="[
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '请输入正确长度的姓名', trigger: 'blur' },
        ]"
      >
        <el-input v-model="user.username" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item
        label="学校"
        prop="university"
        :rules="[{ required: true, message: '请输入学校', trigger: 'blur' }]"
      >
        <el-input v-model="user.university" placeholder="学校"></el-input>
      </el-form-item>
      <el-form-item
        label="校区"
        prop="campus"
        :rules="[{ required: true, message: '请输入校区', trigger: 'blur' }]"
      >
        <el-input v-model="user.campus" placeholder="校区"></el-input>
      </el-form-item>
      <el-form-item
        prop="major"
        label="专业"
        :rules="[{ required: true, message: '请输入专业', trigger: 'blur' }]"
      >
        <el-input v-model="user.major" placeholder="专业"></el-input>
      </el-form-item>
      <el-form-item
        label="班级"
        prop="classId"
        :rules="[
          { required: true, message: '请输入班级', trigger: 'blur' },
          {
            type: 'number',
            message: '请输入正确格式（如198）',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model.number="user.classId" placeholder="班级"></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="user.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度需为6-16位', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="user.password"
          placeholder="密码"
          type="password"
        ></el-input>
      </el-form-item>
      <button
        type="button"
        class="el-button el-button--primary"
        @click="register"
      >
        <span>提交</span>
      </button>
    </el-form>
  </div>
</template>


<script>
export default {
  data: function () {
    return {
      user: {
        stuNum: "",
        nickName: "",
        username: "",
        password: "",
        email: "",
        major: "",
        campus: "",
        university: "",
        classId: "",
      },
    };
  },
  methods: {
    async register() {
      let pattEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        pattPassword = /^\w{6,16}$/,
        pattMajor = /[\u4e00-\u9fa5]{2,10}/gm,
        pattCampus = /[\u4e00-\u9fa5]{2,10}/gm,
        pattUniversity = /[\u4e00-\u9fa5]{2,10}/gm,
        pattClassId = /^\d{3,4}$/,
        pattStuNum = /^\d{10,15}$/;

      let {
        stuNum,
        nickName,
        username,
        password,
        email,
        major,
        campus,
        university,
        classId,
      } = this.user;
      // 判断是否符合
      if (!pattStuNum.test(stuNum)) {
        this.$message({
          type: "error",
          message: "请输入正确的学号",
        });
      } else if (!nickName) {
        this.$message({
          type: "error",
          message: "请输入昵称",
        });
      } else if (!username) {
        this.$message({
          type: "error",
          message: "请输入姓名",
        });
      } else if (!pattUniversity.test(university)) {
        this.$message({
          type: "error",
          message: "请输入正确的学校",
        });
      } else if (!pattCampus.test(campus)) {
        this.$message({
          type: "error",
          message: "请输入正确的校区",
        });
      } else if (!pattMajor.test(major)) {
        this.$message({
          type: "error",
          message: "请输入正确的专业",
        });
      } else if (!pattClassId.test(classId)) {
        this.$message({
          type: "error",
          message: "请输入正确的班级",
        });
      } else if (!pattEmail.test(email)) {
        this.$message({
          type: "error",
          message: "请输入正确邮箱",
        });
      } else if (!pattPassword.test(password)) {
        this.$message({
          type: "error",
          message: "请输入正确的密码",
        });
      } else {
        let result = await this.$store.dispatch("userRegister", this.user);
        if (result == "学号已被占用") {
          this.$message({
            type: "warning",
            message: "学号已被占用",
          });
        } else {
          this.$message({
            type: "success",
            message: "注册成功",
          });
          this.$router.push("/LoginAndRegister/login");
        }
      }
    },
  },
};
</script>


<style lang="less" scoped>
.register-container {
  margin-top: 35px;
}
.el-button {
  height: 50px;
  width: 100%;
}
.iconfont {
  font-size: 18px;
  color: #4b4343;
}
</style>
