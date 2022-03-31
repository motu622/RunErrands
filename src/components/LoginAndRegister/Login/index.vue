<template>
  <div class="login-container">
    <div class="input-item">
      <div class="el-input el-input--prefix el-input--suffix">
        <input
          type="text"
          autocomplete="off"
          placeholder="邮箱"
          v-model="user.email"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon iconfont icon-yonghu"></i>
        </span>
      </div>
      <div class="el-input el-input--prefix el-input--suffix">
        <input
          type="password"
          autocomplete="off"
          placeholder="密码"
          v-model="user.password"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon iconfont icon-mima"></i>
        </span>
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner"> </span>
        </span>
      </div>
      <div class="rememberMe">
        <el-checkbox v-model="remember">记住密码</el-checkbox>
      </div>

      <button
        type="button"
        class="el-button el-button--primary"
        @click="toLogin"
      >
        <span>登录</span>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  data: function () {
    return {
      remember: false,
      user: {
        email: "",
        password: "",
        rememberMe: 0,
      },
    };
  },
  watch: {
    remember(newValue, oldValue) {
      this.user.rememberMe = newValue === false ? 0 : 1;
    },
  },
  methods: {
    //login登录方法
    async toLogin() {
      // 获取用户数据
      let { email, password } = this.user;
      if (email.trim() && password.trim()) {
        // 发请求登录
        try {
          await this.$store.dispatch("userLogin", this.user);
          // 下面需与导航守卫配合去想去但没有去的地方
          let redirect = this.$route.query.redirect || "/Home";
          this.$router.push(redirect);
        } catch (error) {
          this.$message({
            type: "error",
            message: "邮箱或密码错误",
          });
          this.password = "";
        }
      } else {
        this.$message({
          type: "warning",
          message: "请将信息填写完整",
        });
      }
    },
  },
};
</script>


<style lang="less" scoped>
.login-container {
  margin-top: 35px;
  .input-item {
    .rememberMe {
      margin-bottom: 15px;
      label {
        display: block;
        width: 100px;
        margin: 0 auto;
      }
    }
  }
}

//原样式覆盖

.el-input--prefix {
  .el-input__inner {
    padding-left: 40px;
    height: 50px;
    margin-bottom: 20px;
  }

  .el-input__prefix {
    width: 35px;
    height: 50px;
    color: #000000;

    .el-input__icon {
      height: 50px;
    }
    .fa-2x {
      font-size: 20px;
    }
  }
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



