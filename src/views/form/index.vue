<template>
  <el-card shadow="always" body-style="text-align:center">
    <div class="table-list-operator">
      <el-steps :active="currentTab" finish-status="success" align-center>
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <step1 v-if="currentTab === 0" @nextStep="nextStep" />
    <step2 v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep" />
    <step3 v-if="currentTab === 2" @prevStep="prevStep" @finish="finish" />
  </el-card>
</template>

<script>
import step1 from "./step1";
import step2 from "./step2";
import step3 from "./step3";

export default {
  components: {
    step1,
    step2,
    step3
  },
  data() {
    return {
      currentTab: 0
    };
  },
  methods: {
    nextStep() {
      if (this.currentTab < 2) {
        this.currentTab += 1;
      }
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1;
      }
    },
    finish() {
      this.currentTab = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.table-list-operator {
  margin: auto;
  padding: 30px;
}
.el-step__title {
  font-size: 12px;
}
.el-step__title.is-process {
  color: #1247af;
}
</style>