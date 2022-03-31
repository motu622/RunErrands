<template>
  <el-row style="min-width: 800px">
    <el-col :span="24">
      <el-menu
        class="el-menu-demo"
        background-color="#f4f5f7"
        mode="horizontal"
      >
        <router-link class="logo" to="/home">RunErrands</router-link>

        <el-submenu index="1" class="rightSubMenu">
          <template slot="title">个人信息</template>
          <el-menu-item index="1-1" @click="toPersonInfo"
            >我的信息</el-menu-item
          >
          <el-menu-item index="1-2" @click="toOrderInfo">接单信息</el-menu-item>
          <el-menu-item @click="toMyOrder" index="1-3">订单管理</el-menu-item>
          <el-menu-item @click="toAwarding" index="1-4">积分兑换</el-menu-item>
          <el-menu-item
            @click="toRecruitManage"
            index="1-5"
            v-if="this.$store.state.user.isAdmin === true"
            >招聘管理</el-menu-item
          >
          <el-menu-item index="1-6" @click="toAccountManege"
            >账号管理</el-menu-item
          >
        </el-submenu>

        <el-menu-item
          class="register"
          @click="toRegister"
          v-if="!$store.state.user.userInfo"
          index="2"
          >注册
        </el-menu-item>
        <el-menu-item class="register" v-else index="3" @click="logout"
          >退出</el-menu-item
        >
        <el-menu-item
          class="login"
          @click="toLogin"
          v-if="!$store.state.user.userInfo"
          index="4"
          >登录
        </el-menu-item>
        <el-menu-item class="login" v-else index="5">{{
          $store.state.user.userInfo.nickName
        }}</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>


<script>
export default {
  name: "",

  methods: {
    toLogin() {
      this.$router.push("/LoginAndRegister/Login");
    },
    toRegister() {
      this.$router.push("/LoginAndRegister/Register");
    },
    toMyOrder() {
      this.$router.push("/MyOrder");
    },
    toPersonInfo() {
      this.$router.push("/PersonInfo");
    },
    toAccountManege() {
      this.$router.push("/AccountManage");
    },
    toOrderInfo() {
      this.$router.push("/OrderInfo");
    },
    async logout() {
      await this.$store.dispatch("resetUserInfo");
      this.$router.push("/LoginAndRegister/Login");
    },
    toRecruitManage() {
      this.$router.push("/RecruitManage");
    },
    toAwarding() {
      this.$router.push("/Awarding");
    },
  },
};
</script>


<style lang="less" scoped>
a {
  text-decoration: none;
}
.logo {
  float: left;
  line-height: 61px;
  font-size: 35px;
  color: skyblue;
  padding-left: 5%;
  font-style: italic;
}
.login {
  float: right !important;
}
.register {
  float: right !important;
}
.rightSubMenu {
  float: right !important;
  display: block;
  padding-right: 5%;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

