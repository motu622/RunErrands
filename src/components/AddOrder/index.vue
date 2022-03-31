<template>
  <div class="runLeg_container">
    <el-form ref="form" label-width="80px" :model="takeForm">
      <el-form-item
        label="订单描述"
        prop="detail"
        :rules="[
          { required: true, message: '请输入订单描述', trigger: 'blur' },
        ]"
      >
        <el-input
          type="textarea"
          v-model="takeForm.detail"
          placeholder="订单描述"
          :rows="1"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="type === 1 ? '所付筹金' : '所获积分'"
        prop="price"
        :rules="[
          {
            required: true,
            message: type === 1 ? '请输入所付筹金' : '请输入所获积分',
            trigger: 'blur',
          },
          {
            type: 'number',
            message: '只允许输入数字',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model.number="takeForm.price"
          :placeholder="type === 1 ? '所付筹金(元)' : '所获积分(积分)'"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="所需人数"
        v-if="type !== 1"
        prop="num"
        :rules="[
          {
            required: true,
            message: '请输入人数',
            trigger: 'blur',
          },
          {
            type: 'number',
            message: '只允许输入数字',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model.number="takeForm.num"
          placeholder="所需人数"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="学校"
        prop="university"
        :rules="[
          {
            required: true,
            message: '请输入学校',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="takeForm.university" placeholder="学校"></el-input>
      </el-form-item>
      <el-form-item
        label="校区"
        prop="campus"
        :rules="[
          {
            required: true,
            message: '请输入校区',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="takeForm.campus" placeholder="校区"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrder()">立即发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { reqOrderAdd } from "@/api";
export default {
  name: "",
  data() {
    return {
      takeForm: {
        detail: "",
        price: "",
        university: "",
        num: "",
        campus: "",
        typeId: this.type,
      },
    };
  },
  props: ["type"],
  computed: {
    takeFormCopy() {
      let demo = this.takeForm;
      demo.num = demo.num === "" ? 1 : demo.num;
      demo.price = demo.typeId === 1 ? demo.price + "元" : demo.price + "积分";
      return demo;
    },
  },
  methods: {
    async addOrder() {
      let { detail, price, university, campus } = this.takeForm;
      if (detail !== "" && price !== "" && university !== "" && campus !== "") {
        let result = await reqOrderAdd(this.takeFormCopy);
        if (result.code === 0) {
          this.$message({
            type: "success",
            message: "发布成功",
          });
          this.$bus.$emit("OrderShow");
          detail = "";
          price = "";
          university = "";
          campus = "";
          num = "";
        } else {
          this.$message({
            type: "error",
            message: "发布失败",
          });
        }
      } else {
        this.$message({
          type: "info",
          message: "请填写完整信息",
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
.smallInput {
  width: 49%;
}
.small {
  margin: 0 8px;
}
</style>

